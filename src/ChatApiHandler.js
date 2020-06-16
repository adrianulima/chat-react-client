import axios from 'axios'

const getResponseData = (response) => response && response.data
const apiErrorHandler = (error) => error && console.log(error)

const ChatApiHandler = ({ baseUrl } = {}) => {
  const axiosApi = axios.create({
    baseURL: baseUrl || 'http://localhost:5000',
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
  })

  return {
    axios: axiosApi,

    postRoom: (config) => {
      return axiosApi
        .post('/rooms', config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    getRooms: (config) => {
      return axiosApi
        .get('/rooms', config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    getRoom: (roomId, config) => {
      return axiosApi
        .get(`/rooms/${roomId}`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    updateRoom: (roomId, config) => {
      return axiosApi
        .update(`/rooms/${roomId}`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    deleteRoom: (roomId, config) => {
      return axiosApi
        .delete(`/rooms/${roomId}`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    postRoomMessage: (roomId, config) => {
      return axiosApi
        .post(`/rooms${roomId}/messages`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    getRoomMessages: (roomId, config) => {
      return axiosApi
        .get(`/rooms${roomId}/messages`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    postRoomUser: (roomId, config) => {
      return axiosApi
        .post(`/rooms${roomId}/users`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    getRoomUsers: (roomId, config) => {
      return axiosApi
        .get(`/rooms${roomId}/users`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },

    updateRoomUser: (roomId, userId, config) => {
      return axiosApi
        .put(`/rooms${roomId}/users/${userId}`, config)
        .then(getResponseData)
        .catch(apiErrorHandler)
    },
  }
}

export default ChatApiHandler
