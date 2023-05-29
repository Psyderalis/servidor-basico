const http = require('http')
const { infoCursos } = require('./cursos')

const servidor = http.createServer((req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return manejarSolicitudGET(req, res)
    case 'POST':
      return manejarSolicitudPOST(req, res)
    default:
      res.statusCode = 501
      res.end(`El metodo usado no puede ser manejado por el servidor: ${method}`)
      break
  }
})

function manejarSolicitudGET(req, res) {
  const path = req.url

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.statusCode = 200 //si es 200 no es necesario asignarlo, ya que se asigna por defecto
    return res.end('Bienvenidas a mi primer servidor y API creados con Node.js')
  } else if (path === '/cursos') {
    res.statusCode = 200
    return res.end(JSON.stringify(infoCursos))
  } else if (path === '/cursos/programacion') {
    res.statusCode = 200
    return res.end(JSON.stringify(infoCursos.programacion))
  }

  res.statusCode = 404
  res.end('El recurso solicitado no existe.')
}

function manejarSolicitudPOST(req, res) {
  const path = req.url
  console.log(path)

  if (path === '/cursos/programacion') {
    let cuerpo = ''

    req.on('data', contenido => {
      cuerpo += contenido.toString()
    })

    req.on('end', () => {
      console.log(cuerpo)
      console.log(typeof cuerpo)

      //convertir a objeto de js
      cuerpo = JSON.parse(cuerpo)
      console.log(cuerpo.titulo)

      console.log(typeof cuerpo)

      res.end('El servidor recibió una solicitud POST para /cursos/programacion.')
    })
  } else {
    console.log('Recurso no encontrado')
    res.statusCode = 404
    res.end('El recurso solicitado no existe.')
  }
}


const PUERTO = 3000

servidor.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`)
})