import { request } from "./request";

export function getSort() {
  return new request({
    url: '/category'
  })
}

export function getSubSort(maitKey) {
  return new request({
    url: '/subcategory',
    params:{
      maitKey
    }
  })
}

export function getSortDetail(miniWallkey, type) {
  return new request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}