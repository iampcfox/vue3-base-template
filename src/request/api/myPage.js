import request from '@/request'

export const saveTemp = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/saveTemp',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const updateTemp = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/updateTemp',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const updateTempBaseInfo = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/updateTempBaseInfo',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const getTempList = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/tempTableData',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const deleteTemp = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/delete',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const changeStatus = (data) => {
  return request({
    method: 'POST',
    url: '/codePlatform/switchStatus',
    data
  }).catch((err) => {
    console.log(err)
    return err
  })
}

export const getTempInfoById = (params) => {
  return request({
    method: 'GET',
    url: '/codePlatform/tempInfoById',
    params
  }).catch((err) => {
    console.log(err)
    return err
  })
}
