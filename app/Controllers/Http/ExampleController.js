'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with examples
 */
const User = use('App/Models/User')
class ExampleController {
  /**
   * Show a list of all examples.
   * GET examples
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {//ver todo
    const userAll = User.all();

    return userAll;
  }

  /**
   * Create/save a new example.
   * POST examples
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {//crear
    try {
      const data = request.all();
      const userExists = await User.findBy('email',data.email)
      if(userExists){
        return response.send({message:{erro: 'Usuario Existente'}})
      }
      const user = await User.create(data)
      return user;
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single example.
   * GET examples/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {//ver por id
    try {
      const data = request.all()
      const userExists = await User.findBy('id',data.id)
      if(userExists){
        return userExists;
      }
      return response.send({message:'No Existe'})
    } catch (error) {
      
    }
  }



  /**
   * Update example details.
   * PUT or PATCH examples/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {//editar
  }

  /**
   * Delete a example with id.
   * DELETE examples/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {//eliminar
  }
}

module.exports = ExampleController
