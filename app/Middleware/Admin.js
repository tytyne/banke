'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({auth, request,response }, next) {
    // call next to advance the request
    // return response.send({user: request.user});
    // console.log(await auth.getUser());
    if(! (await auth.getUser()).isAdmin) return response.status(403).send('Access denied');

    await next()
  }
}

module.exports = Admin
