'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
// const User = use('App/Models/User')
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const userExists = User.all();
    console.log('Todos');
    return userExists;
    // return response.json(userExists)
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const userExists = await User.findBy('email',data.email)//verificar si el usuario ya existe
      if(userExists){
        return response.send({message:{erro:'User Existente'}})
      }
      userExists = await User.create(data)//Usuario creado
      return response.status(201).send({message:{status:'SUCCESSFUL'}});
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      // const data = request.all();
      const userExists = await User.findBy('id',params.id);
      if(userExists){
        console.log('Existe');
        return userExists;
        // console.log('existe')
      }
      console.log('No existe');
      // return userExists
      return response.send({message:{error:'User no Existe'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      // const data = request.all()
      const userExists = await User.findBy('id',params.id)
      if(userExists){
        await userExists.delete()
        return userExists
      }
      return response.send({message:{error:'User no Existe'}})      
    } catch (error) {
      return response.send(error)
    }
  }
}

module.exports = UserController
