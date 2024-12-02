const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); //Need to install this using the command for test to work on your machine: npm install --save-dev mongodb-memory-server 
const User = require('../models/User'); // Adjust the path if needed
const { faker } = require('@faker-js/faker'); //get faker for passwords

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Suite for User Model Unit Testing', () => {
    test('Create/Save Valid User', async () => { // Creates and saves a valid user.
        // Use faker to generate random test data
        const validUser = new User({
          name: faker.person.firstName(),               // Random first name
          email: faker.internet.email(),              // Random email
          password: faker.internet.password(),        // Random password
        });
      
        // Save the user to the database
        const savedUser = await validUser.save();
      
        // Assertions to verify the saved user data
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(validUser.name);  // Check name
        expect(savedUser.email).toBe(validUser.email); // Check email
        expect(savedUser.password).toBe(validUser.password); // Check password
      });

  test('Create Invalid User with Some Info', async () => { //Attempts to create invalid user with only a name.
    const invalidUser = new User({
        name: 'Guy',
    });
    
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  test('Create Invalid User with Empty Strings', async () => { //Attempts to create invalid user with empty strings for their information.
    const invalidUser = new User({
      name: '',
      email: '',
      password: '',
    });
  
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });
  

  test('Create Invalid User with Empty Info', async () => { //Attempts to create invalid user with no info.
    const invalidUser = new User({});
    
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });
});