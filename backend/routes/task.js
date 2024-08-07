const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

//CreateTask
router.post("/create-task", authenticateToken, async (req, resp) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;
        const newTask = new Task({ title: title, desc: desc });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
        resp.status(200).json({ message: "Task Created" })

    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

//GET ALL Tasks 
router.get("/get-all-task", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path: "tasks", options: { sort: { createdAt: -1 } } });
        resp.status(200).json({ data: userData })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});


//DELETE TASK
router.delete("/delete-task/:id", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        resp.status(200).json({ message: "Task Deleted Successfully" })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});


//UPDATE TASK
router.put("/update-task/:id", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title: title, desc: desc })
        resp.status(200).json({ message: "Task Updated Successfully" })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

//UPDATE IMPORTANT TASK
router.put("/update-imp-task/:id", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { important: !ImpTask })
        resp.status(200).json({ message: "Task Updated Successfully" })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

//UPDATE COMPLETE TASK
router.put("/update-comp-task/:id", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const CompTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !CompTask })
        resp.status(200).json({ message: "Task Updated Successfully" })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

//GET IMPORTANT TASK
router.get("/get-imp-task", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { important: true }, options: { sort: { createdAt: -1 } } });
        const impTaskData = Data.tasks;
        resp.status(200).json({ data: impTaskData })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});


//GET COMPLETE TASK
router.get("/get-complete-task", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: true }, options: { sort: { createdAt: -1 } } });
        const CompTaskData = Data.tasks;
        resp.status(200).json({ data: CompTaskData })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});


//GET INCOMPLETE TASK
router.get("/get-incomplete-task", authenticateToken, async (req, resp) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: false }, options: { sort: { createdAt: -1 } } });
        const IncompTaskData = Data.tasks;
        resp.status(200).json({ data: IncompTaskData })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

module.exports = router;