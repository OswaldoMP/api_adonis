'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
const Sale = use('App/Models/Sale')
const Inventory = use('App/Models/Inventorie')
const Transaction = use('App/Models/Transaction')
const Product = use ('App/Models/Product')
// productu_id
// user_id
// quantity
// total
// Date
// paymethod
// status
class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const sale = await Sale.all();
      return sale;
    } catch (error) {
      return response.send(error);
    }
  }

  /**
   * Render a form to be used for creating a new sale.
   * GET sales/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    var newQuantity = 0
    var oldQantity = 0
    var total = 0
    const sale = new Sale();
    try {
      const data = request.all()
      // const sale = await Sale.findBy('id',data.id)
      console.log("bien")
      const transaction = new Transaction()
      // const product = await Product.findBy('id',data.product_id)
      const inventory = await Inventory.findBy('product_id',data.product_id)
      console.log(inventory)
      oldQantity = inventory.quantity
      newQuantity = oldQantity - data.quantity
      inventory.quantity = newQuantity
      await inventory.save()
      //transaction
      transaction.inventory_id = inventory.id
      transaction.type = 2
      transaction.quantity = request.input('quantity')
      await transaction.save();      
      //sale
      total = (((inventory.price * inventory.tax)/100)+inventory.price) * data.quantity
        if (data.discount > 0) {
          total = (total*data.discount)/100;
        }
      sale.product_id = data.product_id
      sale.user_id = data.user_id
      sale.quantity = data.quantity
      sale.discount = data.discount
      sale.total = total
      sale.paymenth_method = data.paymenth_method
      await sale.save();
      return response.json(sale)
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController
