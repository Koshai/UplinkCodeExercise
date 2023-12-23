const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
    const code = req.body.code;

    // Move the declaration outside the route handler
    const fileName = 'HelloWorld.java';

    // Save the code to a temporary file
    fs.writeFileSync(fileName, code);

    exec(`javac ${fileName} && java ${fileName.replace('.java', '')}`, (error, stdout, stderr) => {
        if (error) {
            res.json({ output: stderr });
        } else {
            res.json({ output: stdout });
        }

        // Clean up: remove the temporary file
        fs.unlinkSync(fileName);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
