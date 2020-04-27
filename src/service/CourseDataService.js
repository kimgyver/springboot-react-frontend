import axios from 'axios';

const INSTRUCTOR = 'in28minutes';
//const COURSE_API_URL = 'http://localhost:8080';
const COURSE_API_URL = 'http://springboot4react-env.eba-tcijetry.ap-southeast-2.elasticbeanstalk.com';
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`;

class CourseDataService {
    retrieveAllCourses(name) {
        return axios.get(`${INSTRUCTOR_API_URL}/courses`);
    }

    retrieveCourse(name, id) {
        return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }

    deleteCourse(id) {
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }

    updateCourse(name, id, course) {
        return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
    }

    createCourse(name, course) {
        return axios.post(`${INSTRUCTOR_API_URL}/courses`, course);
    }
}

export default new CourseDataService();