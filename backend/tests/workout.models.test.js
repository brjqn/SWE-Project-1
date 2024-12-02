const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); //Need to install this using the command for test to work on your machine: npm install --save-dev mongodb-memory-server 
const Workout = require('../models/workout.models');

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

describe('Suite for Workout Model Unit Testing', () => {

  test('Create Valid Workout 1', async () => { //Creates and saves a valid workout.
    const validWorkout = new Workout({
      Exercise: 'Tricep Pushdown',
      Equipment: 'Cable Machine',
      Exercise_Type: 'Weight Training',
      Major_Muscle: 'Tricep',
      User_Made: true
    });
    
    const savedWorkout = await validWorkout.save();
    
    expect(savedWorkout._id).toBeDefined();
    expect(savedWorkout.Exercise).toBe('Tricep Pushdown');
    expect(savedWorkout.Equipment).toBe('Cable Machine');
    expect(savedWorkout.Exercise_Type).toBe('Weight Training');
    expect(savedWorkout.Major_Muscle).toBe('Tricep');
    expect(savedWorkout.User_Made).toBe(true);
  });

  test('Create Valid Workout 2', async () => { //Creates and saves a valid workout with non-require information as well.
    const validWorkout = new Workout({
      Exercise: 'Dips',
      Equipment: 'Dip Bars',
      Exercise_Type: 'Calisthenics',
      Major_Muscle: 'Lower Chest',
      Minor_Muscle: 'Tricep',
      User_Made: true
    });
    
    const savedWorkout = await validWorkout.save();
    
    expect(savedWorkout._id).toBeDefined();
    expect(savedWorkout.Exercise).toBe('Dips');
    expect(savedWorkout.Equipment).toBe('Dip Bars');
    expect(savedWorkout.Exercise_Type).toBe('Calisthenics');
    expect(savedWorkout.Major_Muscle).toBe('Lower Chest');
    expect(savedWorkout.Minor_Muscle).toBe('Tricep');
    expect(savedWorkout.User_Made).toBe(true);
  });

  test('Create Invalid Workout with missing information', async () => { //Attempts to create invalid workout with no information.
    const invalidWorkout = new Workout({
        Exercise: 'Bench Press',
    }); 

    let err;
    try {
      await invalidWorkout.save();
    } 
    
    catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.Equipment).toBeDefined();
    expect(err.errors.Exercise_Type).toBeDefined();
    expect(err.errors.Major_Muscle).toBeDefined();
  });

  test('Create Invalid Workout with missing information', async () => { //Attempts to create invalid workout with empty strings.
    const invalidWorkout = new Workout({
        Exercise: '',
        Equipment: '',
        Exercise_Type: '',
        Major_Muscle: '',
    });

    let err;
    try {
      await invalidWorkout.save();
    } 
    
    catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.Exercise).toBeDefined();
    expect(err.errors.Equipment).toBeDefined();
    expect(err.errors.Exercise_Type).toBeDefined();
    expect(err.errors.Major_Muscle).toBeDefined();
  });


  test('Create Invalid Workout with empty information', async () => { //Attempts to create invalid workout with no information.
    const invalidWorkout = new Workout({}); 

    let err;
    try {
      await invalidWorkout.save();
    } 
    
    catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.Exercise).toBeDefined();
    expect(err.errors.Equipment).toBeDefined();
    expect(err.errors.Exercise_Type).toBeDefined();
    expect(err.errors.Major_Muscle).toBeDefined();
  });

  
});