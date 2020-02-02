import axios, { AxiosRequestConfig } from 'axios'
declare var window: any

class BrowserImageCoverter {
  async getImageBase64FromUrl(url: string): Promise<string> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    }
    const response = await axios(options).catch(error =>
      console.error(`Cannot get captcha image!`)
    )
    return Buffer.from(response['data'], 'binary').toString('base64')
  }

  private downloadImageFromBase64(
    base64: string,
    fileName: string,
    imageType: string
  ): void {
    const imageEl = document.createElement('a')
    imageEl.href = `data:image/${imageType};base64,${base64}`
    imageEl.download = `${fileName}.${imageType}`
    document.body.appendChild(imageEl)
    imageEl.click()

    console.log(`Saved as ${fileName}.${imageType}`)
    // remove element
    if (imageEl.parentNode) {
      document.body.removeChild(imageEl)
    }
  }

  downloadImageWithType = (
    url: string,
    fileName: string,
    imageType = 'jpeg'
  ): void => {
    this.getImageBase64FromUrl(url).then(base64 => {
      this.downloadImageFromBase64(base64, fileName, imageType)
    })
  }
}

const browserImageCoverter = new BrowserImageCoverter()
Object.freeze(browserImageCoverter)
window.browserImageCoverter = browserImageCoverter
export default browserImageCoverter
