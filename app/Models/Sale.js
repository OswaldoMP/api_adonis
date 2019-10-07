'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

    product(){
        return this.belongsTo('App/Models/Product')
    }

    user(){
        return this.belongsTo('App/Models/User')
    }


    //todo biien
}

module.exports = Sale
