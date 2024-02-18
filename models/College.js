
import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

const College = mongoose.model('College', collegeSchema);

export default College;
