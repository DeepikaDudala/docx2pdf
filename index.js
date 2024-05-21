const { spawn } = require('child_process');

// Function to install Python requirements
const installRequirements = () => {
	return new Promise((resolve, reject) => {
		const pipInstall = spawn('pip', ['install', '-r', 'requirements.txt']);

		pipInstall.stdout.on('data', (data) => {
			console.log(`pip: ${data}`);
		});

		pipInstall.stderr.on('data', (data) => {
			console.error(`pip error: ${data}`);
		});

		pipInstall.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(`pip install process exited with code ${code}`);
			}
		});
	});
};

// Function to convert DOCX to PDF
const convertDocxToPdf = (inputDocx, outputPdf) => {
	return new Promise((resolve, reject) => {
		const pythonProcess = spawn('python', ['index.py', inputDocx, outputPdf]);

		pythonProcess.stdout.on('data', (data) => {
			console.log(`Output from Python: ${data}`);
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`Error from Python: ${data}`);
		});

		pythonProcess.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(`Python script exited with code ${code}`);
			}
		});
	});
};

// Main function to run the steps
const main = async () => {
	try {
		await installRequirements();
		console.log('Requirements installed successfully.');

		const inputDocx = 'input.docx';
		const outputPdf = 'output.pdf';

		await convertDocxToPdf(inputDocx, outputPdf);
		console.log('Conversion successful.');
	} catch (error) {
		console.error(`Error: ${error}`);
	}
};

main();
