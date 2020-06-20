import axios from 'axios'

const getResponseData = (response) => response && response.data
export const apiErrorHandler = (error) => error && console.log(error)

const ChatApiHandler = ({ baseUrl } = {}) => {
  const axiosApi = axios.create({
    baseURL: baseUrl || 'http://localhost:5000',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  return {
    axios: axiosApi,

    postRoom: (data, config) =>
      axiosApi.post('/rooms', data, config).then(getResponseData),

    getRooms: (config) => axiosApi.get('/rooms', config).then(getResponseData),

    getRoom: (roomId, config) =>
      axiosApi.get(`/rooms/${roomId}`, config).then(getResponseData),

    updateRoom: (roomId, data, config) =>
      axiosApi.put(`/rooms/${roomId}`, data, config).then(getResponseData),

    deleteRoom: (roomId, config) =>
      axiosApi.delete(`/rooms/${roomId}`, config).then(getResponseData),

    postRoomMessage: (roomId, data, config) =>
      axiosApi
        .post(`/rooms/${roomId}/messages`, data, config)
        .then(getResponseData),

    getRoomMessages: (roomId, config) =>
      axiosApi.get(`/rooms/${roomId}/messages`, config).then(getResponseData),

    postRoomUser: (roomId, data, config) =>
      axiosApi
        .post(`/rooms/${roomId}/users`, data, config)
        .then(getResponseData),

    getRoomUsers: (roomId, config) =>
      axiosApi.get(`/rooms/${roomId}/users`, config).then(getResponseData),

    updateRoomUser: (roomId, userId, data, config) =>
      axiosApi
        .put(`/rooms/${roomId}/users/${userId}`, data, config)
        .then(getResponseData),
  }
}

export default ChatApiHandler
