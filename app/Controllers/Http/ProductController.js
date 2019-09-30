'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product');

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const productAll = Product.all()
    return productAll;
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const newProduct = await Product.findBy('code',data.code);
      if (newProduct) {
        return response.send({message:{status:'Existente'}})
      }
      newProduct = await Product.create(data);
      return response.send({message:{status:'SUCCESSFUL'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const productId = await Product.findBy('id',params.id)
    if(productId){
      return productId
    }
    return response.send({message:{status:'No successful'}})
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const productExists = await Product.findBy('id',params.id)//verificar si el usuario ya existe
      if(productExists){
        productExists.merge(data)
        await productExists.save()
        // productExists = await product.create(data)//Usuario creado
        // return response.status(201).send({message:{status:'SUCCESSFUL'}}).json(productExists);
        return productExists;
      }
      return response.send({message:{erro:'product  no Existente'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const productId = await Product.findBy('id',params.id)
    if(productId){
      await productId.delete()
      return productId
    }
    return response.send({message:{status:'No successful'}})
  }
}

module.exports = ProductController
