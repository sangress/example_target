import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const Todo = sequelize.define("Todo", {
  title: DataTypes.STRING,
  checked: DataTypes.BOOLEAN,
  children: DataTypes.JSON,
});

export { Todo };

export default function () {
  Todo.sync();
}
