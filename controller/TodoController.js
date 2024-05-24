const Todo = require("../models/TodoModel");

module.exports = {
  createTodo: async (req, res) => {
    //console.log(req.userId);
    try {
      const { title } = req.body;
      const todo = new Todo({ title, userId: req.userId });
      const savedTodo = await todo.save();
      res.status(201).json({ message: "Todo Created Successfully", savedTodo });
    } catch (error) {
      console.log("Error creating todo:", error);
      res.status(500).json({ message: "Internal Server error" });
    }
  },
getAllTodos:async(req,res)=>{
    try {
        const todos=await Todo.find({userId: req.userId});
        res.json(todos);
    } catch (error) {
        console.log('Error getting todos:',error)
        res.status(500).json({message:'Internal Server error'})
    }
}
};
