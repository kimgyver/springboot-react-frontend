import React, { Component } from 'react';
import CourseDataService from '../service/CourseDataService';
import '../App.css';

const INSTRUCTOR = 'in28minutes';

class ListCoursesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: null
        };
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteCourseClicked = this.deleteCourseClicked.bind(this);
        this.updateCourseClicked = this.updateCourseClicked.bind(this);
        this.addCourseClicked = this.addCourseClicked.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses(INSTRUCTOR)
            .then(
                response => {
                    console.log(response);
                    this.setState({ courses: response.data })
                }
            )
    }

    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(id)
            .then(
                response => {
                    console.log(response);
                    this.setState({ message: `Delete of course ${id} Successful` });
                    //this.refreshCourses();
                    this.setState({ courses: this.state.courses.filter(c => c.id !== id)})
                }
            )
    }

    updateCourseClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/courses/${id}`)
    }

    addCourseClicked() {
        this.props.history.push(`/courses/-1`)
    }

    render() {
        return (
            <div className='container'>
                <h3>All Courses</h3>
                {this.state.message && 
                    <div className='alert alert-success'>{this.state.message}</div>
                }
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.description}</td>
                                        <td><button className="btn btn-success" onClick={ () => this.updateCourseClicked(c.id) }>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={ () =>  {this.deleteCourseClicked(c.id); console.log(c)} }>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                </div>

            </div>
        );
    }
}

export default ListCoursesComponent;