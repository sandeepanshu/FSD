import express from "express";
import verifyToken from "../middlewares/TokenVerifier.ts";
import { body, validationResult } from "express-validator";
import UserTable from "../models/User.ts";
import OrderTable from "../models/Order.ts";
import type { IUser } from "../models/IUser.ts";
import type { IOrder } from "../models/IOrder.ts";

const orderRouter: express.Router = express.Router();

/*
    @info : To Place an Order
    @url : http://localhost:5000/api/orders/place
    @method : post
    @fields : items , tax , total
    @access ; private
 */
orderRouter.post(
  "/place",
  [
    body("items").not().isEmpty().withMessage("Items should not be empty"),
    body("tax").not().isEmpty().withMessage("Tax should not be empty"),
    body("total").not().isEmpty().withMessage("Total should not be empty"),
  ],
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      let { items, tax, total } = request.body;
      let requestUser: any = request.headers["user"]; // see verifyToken Logic
      let user: IUser = await UserTable.findById(requestUser.id);
      let order: IOrder = new OrderTable({
        name: user.name,
        email: user.email,
        mobile: user.address.mobile,
        items: items,
        tax: tax,
        total: total,
      });
      order = await order.save(); // save to database
      response
        .status(200)
        .json({ msg: "Order Placed Successfully", order: order });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
    @info : Get All Orders
    @url : http://localhost:5000/api/orders/
    @method : get
    @fields : no-fields
    @access ; private
 */
orderRouter.get(
  "/",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      // FIX: Parse token payload
      const requestUserStr = request.headers["user"] as string;
      const requestUser = JSON.parse(requestUserStr);

      // Load user
      const user: IUser | null = await UserTable.findById(requestUser.id);

      if (!user) {
        return response
          .status(404)
          .json({ errors: [{ msg: "User not found" }] });
      }

      // Fetch all orders belonging to this user
      const orders: Array<IOrder> = await OrderTable.find({
        email: user.email,
      });

      return response.status(200).json({ orders });
    } catch (error: any) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

export default orderRouter;
