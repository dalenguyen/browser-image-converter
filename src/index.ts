import axios, { AxiosRequestConfig } from 'axios'
declare var window: any

class BrowserImageCoverter {
  imageTypes = ['JPEG', 'PNG', 'GIF']
  async getImageBase64FromUrl(url: string): Promise<string> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    }
    const response = await axios(options).catch(error =>
      console.error(`Cannot get image!`)
    )
    return Buffer.from(response['data'], 'binary').toString('base64')
  }

  private downloadImageFromBase64(
    base64: string,
    imageType: string,
    fileName: string
  ): void {
    const imageEl = document.createElement('a')
    imageEl.href = `data:image/${imageType};base64,${base64}`
    imageEl.download = `${fileName}.${imageType}`
    document.body.appendChild(imageEl)
    imageEl.click()

    // remove element
    if (imageEl.parentNode) {
      document.body.removeChild(imageEl)
    }
  }

  downloadImageWithType = (
    url: string,
    imageType = 'jpeg',
    fileName = 'converted_image'
  ): void => {
    if (url === '') {
      throw new Error('Please check your image URL!')
    }
    if (!this.imageTypes.includes(imageType.toUpperCase())) {
      throw new Error('Image type must be: JPEG, PNG or GIF')
    }

    this.getImageBase64FromUrl(url)
      .then(base64 => {
        this.downloadImageFromBase64(base64, imageType, fileName)
      })
      .catch(err => console.error(err))
  }
}

const browserImageCoverter = new BrowserImageCoverter()
Object.freeze(browserImageCoverter)
window.browserImageCoverter = browserImageCoverter
export default browserImageCoverter
