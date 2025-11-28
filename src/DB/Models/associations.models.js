import CartItem from "./cart-items.model.js";
import Cart from "./cart.model.js";
import Categories from "./categories.models.js";
import MenuItem from "./menu-item.models.js";
import OrderItem from "./order-item.models.js";
import Orders from "./orders.models.js";
import Payment from "./payment.models.js";
import Reviews from "./reviews.models.js";
import User from "./user.model.js";

User.hasOne(Cart, { foreignKey: "user_id", as: "cart" });
Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });

Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart" });

/*
One user has many orders
and each order has one user
*/
User.hasMany(Orders, {
  foreignKey: "user_id",
  as: "orders",
});
Orders.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

/*
Each user has many reviews
and each review should have one user
*/
User.hasMany(Reviews, {
  foreignKey: "user_id",
  as: "reviews",
});
Reviews.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
/*
Each order has one payment
and each payment belongs to one order
*/
Orders.hasOne(Payment, {
  foreignKey: "order_id",
  as: "payment",
});
Payment.belongsTo(Orders, {
  foreignKey: "order_id",
  as: "order",
});
/*
Each order has one many order-item
and each order-item belongs to one order
*/
Orders.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
});

OrderItem.belongsTo(Orders, {
  foreignKey: "order_id",
  as: "order",
});

/*
Each menu-item has many reviews
and each reviews belongs to one menu-item
*/

MenuItem.hasMany(Reviews, {
  foreignKey: "menu_item_id",
  as: "reviews",
});
Reviews.belongsTo(MenuItem, {
  foreignKey: "menu_item_id",
  as: "item",
});
/*
Each order-item is menu-item
and each menu-item is order-item
*/
OrderItem.belongsTo(MenuItem, {
  foreignKey: "menu_item_id",
  as: "order_item",
});
MenuItem.hasMany(OrderItem, {
  foreignKey: "menu_item_id",
  as: "menu_item",
});
/*
Each menu-item has one category
and each category might have many menu-items
*/
MenuItem.belongsTo(Categories, {
  foreignKey: "category_id",
  as: "category",
});
Categories.hasMany(MenuItem, {
  foreignKey: "category_id",
  as: "menu_items",
});
