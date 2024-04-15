const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const downloadFolder = (req, res) => {
    const folderPath = path.join(__dirname, '..', '..', 'logs');
    console.log(folderPath);
    const outputFilePath =path.join(__dirname, '..', '..', 'logs.zip');

    // Create a new zip archive
    const archive = archiver('zip', {
        zlib: { level: 9 } // Set compression level
    });

    // Pipe the archive to the output file
    const output = fs.createWriteStream(outputFilePath);
    archive.pipe(output);

    // Add the entire folder to the archive
    archive.directory(folderPath, false);

    // Finalize the archive
    archive.finalize();

    // Set response headers to prompt download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=my-folder.zip');

    // Delete the temporary zip file after 24 hours
    setTimeout(() => {
        fs.unlink(outputFilePath, (err) => {
            if (err) {
                console.error('Error deleting zip file:', err);
            } else {
                console.log('Zip file deleted successfully');
            }
        });
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Send the zip file as a response
    output.on('close', () => {
        res.sendFile(outputFilePath, (err) => {
            if (err) {
                console.error('Error sending zip file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Delete the temporary zip file
                fs.unlinkSync(outputFilePath);
            }
        });
    });
};

module.exports = { downloadFolder };
