import browserImageCoverter from './../src'
import { expect } from 'chai'

const imgUrl =
  'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png'

const imgFile = './moon.jpeg'

describe('Browser Image Converter', () => {
  it('browserImageCoverter instance', () => {
    expect(browserImageCoverter).exist
  })
  it('getImageBase64FromUrl', async () => {
    const base64 = await browserImageCoverter.getImageBase64FromUrl(imgUrl)
    expect(base64).contains('iVBORw0KG')
  })
})
