import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import ClasseService from '../services/ClasseService';
import Accueil from "./Acceuil";

class Dashboard extends Component {
    state = {
        data: [],
        error: null,
    };

    async componentDidMount() {
        try {
            const response = await ClasseService.getAll();
            const classes = response.data;

            this.setState({ data: classes });
        } catch (error) {
            console.error('Error retrieving class data:', error);
            this.setState({ error: 'Error retrieving class data' });
        }
    }

    render() {
        const { data, error } = this.state;

        // Define colors for the PieChart segments
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

        return (
            <div>
                {error ? (
                    <div>{error}</div>
                ) : data.length > 0 ? (
                    <div>
                        <h2>Number of Students per Class (Bar Chart)</h2>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="category" dataKey="name" label={{ value: 'Class Name', position: 'insideBottomRight' }} />
                            <YAxis type="number" dataKey="lengthEtudiant" label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="lengthEtudiant" fill="#8884d8" name="Number of Students" />
                        </BarChart>

                        <h2>Distribution of Students by Class (Pie Chart)</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                dataKey="lengthEtudiant"
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}

export default Dashboard;
