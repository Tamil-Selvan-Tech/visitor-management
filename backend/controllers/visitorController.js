const Visitor = require("../models/visitor");

// Add Visitor 
exports.addVisitor = async (req, res) => {
    try {
        const visitor = new Visitor({
            name: req.body.name,
            phone: req.body.phone,
            flatNumber: req.body.flatNumber,
            purpose: req.body.purpose,
            entryTime: new Date(),
            status: "Entered"
        });

        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// All Visitors
exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ entryTime: -1 });
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.exitVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            {
                exitTime: new Date(),
                status: "Exited"
            },
            { new: true }
        );
        res.json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};