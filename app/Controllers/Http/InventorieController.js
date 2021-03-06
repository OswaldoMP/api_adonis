'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with inventories
 */
const Inventorie = use('App/Models/Inventorie')
const Transaction = use('App/Models/Transaction')

class InventorieController {
  /**
   * Show a list of all inventories.
   * GET inventories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // const inventorieExists = Inventorie.all()
    const inventorieExists = await Inventorie
    .query()
    .with('product')
    .with('user')
    // .with('transaction')
    .fetch()
    return inventorieExists;
  }

  /**
   * Render a form to be used for creating a new inventorie.
   * GET inventories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new inventorie.
   * POST inventories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

  }

  /**
   * Display a single inventorie.
   * GET inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      // const data = request.all()
      const newInventorie = await Inventorie.findBy('id',params.id)
      if(newInventorie){
        // const newInventorie = await newInventorie.query().with('user').fetch()
        return newInventorie
      }
      return response.send({message:{error:'Inventorie no Existe'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Render a form to update an existing inventorie.
   * GET inventories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update inventorie details.
   * PUT or PATCH inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const inventorieExists = await Inventorie.findBy('id',params.id)//verificar si el usuario ya existe
      if(inventorieExists){
        inventorieExists.merge(data)
        await inventorieExists.save()
        // inventorieExists = await inventorie.create(data)//Usuario creado
        // return response.status(201).send({message:{status:'SUCCESSFUL'}}).json(inventorieExists);
        return inventorieExists;
      }
      return response.send({message:{erro:'inventorie  no Existente'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a inventorie with id.
   * DELETE inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      // const data = request.all()
      const newInventorie = await Inventorie.findBy('id',params.id)
      if(newInventorie){
        await newInventorie.delete()
        return newInventorie
      }
      return response.send({message:{error:'Inventorie no Existe'}})
    } catch (error) {
      return response.send(error)
    }
  }
}

module.exports = InventorieController
