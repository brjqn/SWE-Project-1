const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); //Need to install this using the command for test to work on your machine: npm install --save-dev mongodb-memory-server 
const User = require('../models/User'); // Adjust the path if needed

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
  test('Create/Save Valid User', async () => { //Creates and saves a valid user.
    const validUser = new User({
      name: 'Thomas',
      email: 'thomas@alive.com',
      password: 'Voyager1997!',
    });

    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe('Thomas');
    expect(savedUser.email).toBe('thomas@alive.com');
    expect(savedUser.password).toBe('Voyager1997!');
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

  test('Create a Duplicate User', async () => { //Attempts to create invalid user with a duplicate email as a preexisting, valid user.
    const firstUser = new User({
      name: 'Noel',
      email: 'noel@knebworth.com',
      password: 'Sallycantwait1995',
    });
  
    const duplicateUser = new User({
      name: 'Liam',
      email: 'noel@knebworth.com', 
      password: 'Sallycantwait1995',
    });
  
    await firstUser.save();
  
    let err;
    try {
      await duplicateUser.save(); // This should fail because duplicateUser used the same email.
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error);
    expect(err.code).toBe(11000); 
  });

  test('Create Invalid User with Invalid Email Format', async () => { //Attempts to create invalid user with an invalid format of email.
    const invalidUser = new User({
      name: 'Julian',
      email: 'julianatsomethingdotcom', 
      password: 'Lastn1te',
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
  });

  test('Create  Invalid User with an Invalid Password 1', async () => { //Attempts to create invalid user with a short password.
    const invalidUser = new User({
      name: 'Peggy',
      email: 'peggy@boilerroom.com',
      password: '11', 
    });
  
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined(); 
  });

  test('Create  Invalid User with an Invalid Password 2', async () => { //Attempts to create invalid user with a password that has all lowercase alphbets.
    const invalidUser = new User({
      name: 'Peggy',
      email: 'peggy@boilerroom.com',
      password: 'eleven', 
    });
  
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined(); 
  });

  test('Create  Invalid User with an Invalid Password 3', async () => { //Attempts to create invalid user with a password that does not include numbers.
    const invalidUser = new User({
      name: 'Peggy',
      email: 'peggy@boilerroom.com',
      password: 'Eleven', 
    });
  
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined(); 
  });

  test('Create  Invalid User with an Invalid Password 4', async () => { //Attempts to create invalid user with a password that does not include special characters.
    const invalidUser = new User({
      name: 'Peggy',
      email: 'peggy@boilerroom.com',
      password: 'Eleven11', 
    });
  
    let err;
    try {
      await invalidUser.save();
    } 
    
    catch (error) {
      err = error;
    }
  
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined(); 
  });
});
