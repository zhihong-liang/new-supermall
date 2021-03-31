import {request} from './request'

export function getCateMenu() {
  return request({
    url: '/category/'
  })
}

export function getCategories(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoriesData(miniWallkey, type){
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
