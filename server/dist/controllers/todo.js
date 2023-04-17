import todoSchema from "../models/todo.js";
export const todoController = {
    create: async (req, res) => {
        try {
            const { name, desc, user } = req.body;
            const newTask = new todoSchema({
                name,
                desc,
                user,
            });
            await newTask.save();
            res.status(201).json({
                msg: "Create Task Success ",
                task: newTask,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAllInUser: async (req, res) => {
        try {
            const { id } = req.params;
            const getTasks = await todoSchema
                .find({ user: id })
                .populate("user", "email");
            res.status(201).json({
                msg: `Get Task On user id ${id} Success `,
                tasks: getTasks,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    changeDone: async (req, res) => {
        try {
            const { id } = req.params;
            const getTask = await todoSchema.findById(id);
            const updateTask = await todoSchema
                .findByIdAndUpdate(id, { done: !getTask.done }, { new: true })
                .populate("user", "email");
            res.status(201).json({
                msg: `Update Task On user id ${id} Success `,
                task: updateTask,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteTask = await todoSchema.findByIdAndDelete(id);
            res.status(201).json({
                msg: `Delete Task On user id ${id} Success`,
                task: deleteTask,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};
//# sourceMappingURL=todo.js.map