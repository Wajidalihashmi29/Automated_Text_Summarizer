import { spawn } from 'child_process';

const summarizeInput = (req, res) => {
    const { input } = req.body;

    if (!input || input.trim() === "") {
        return res.status(400).json({ 
            message: "Input is required"
        });
    }

    const childPython = spawn('python', ['model.py', input]);

    let output = '';
    
    childPython.stdout.on('data', (data) => {
        output += data.toString();
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        if (code === 0) {
            res.status(200).json({
                output: output,
            });
        } else {
            res.status(500).json({
                message: "Python script exited with an error"
            });
        }
    });
};

export { summarizeInput };
