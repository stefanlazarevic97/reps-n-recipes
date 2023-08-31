import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import './MealPlanShow.css'
import { Link as ReactLink } from 'react-router-dom'
// import { jsPDF }from 'jspdf'
import { Document, Page, Text, Image, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';

const MealPlanShow = () => {
    const mealPlan = useSelector(state => state.users.mealPlan);
    const [meals, setMeals] = useState(mealPlan.meals);
    let pdfViewerRef = useRef();
    const [doc, setDoc] = useState();

    useEffect(() => {
        if (mealPlan.meals) {
            const fetchImages = async () => {
                const mealsWithImages = await Promise.all(
                    mealPlan.meals.map(async meal => {
                        const response = await fetch(meal.sourceUrl);
                        const html = await response.text();
                        const doc = new DOMParser().parseFromString(html, 'text/html');
                        const imgSrc = doc.querySelector('.recipeImage')?.src; 
                            
                        return {
                            ...meal, 
                            imgSrc
                        }
                    })  
                );
                    
                setMeals(mealsWithImages);
            }
            
            fetchImages();
        }
        
    }, [mealPlan]);

    // const generatePDF = () => {
    //     const doc = new jsPDF();

    //     doc.text('Meal Plan', 10, 10);
        
    //     meals.forEach(meal => {
    //         doc.text(meal.title, 10, 10);
    //         doc.addImage(meal.imgSrc, 'JPEG', 15, 40, 180, 180);

    //         doc.text('Servings: ' + meal.servings, 10, 230);
    //         doc.text('Ready in ' + meal.readyInMinutes + ' minutes', 10, 240);
            
    //         doc.addPage();
    //     });

    //     doc.save('meal-plan.pdf');
    // }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: "#2D69AF"
        },

        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
    });

    const generateDoc = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.section}>My Meal Plan</Text>

                {meals?.map(meal => (
                    <Page key={meal.id} size="A4" style={styles.page}>
                        <Text>{meal.title}</Text>
                        <img src={meal.imgSrc} />
                        <Text>Servings: {meal.servings}</Text>
                        <Text>Ready in {meal.readyInMinutes} minutes</Text>
                        <Link src={meal.sourceUrl}>{meal.title}</Link>
                    </Page>
                ))}
            </Page>
        </Document>
    );
    
    const generatePDF = () => {
        const doc = generateDoc();
        setDoc(doc);
    }

    if (!mealPlan) {
        return <div>No meal plan generated</div>;
    }

    return (
        <div className='meal-plan-container'>
            <h1>Meal Plan</h1>
            
            {meals && 
                <div>
                    <p>Total Calories: {mealPlan?.nutrients?.calories}</p>
                    <p>Total Carbs: {mealPlan?.nutrients?.carbohydrates}</p>
                    <p>Total Fat: {mealPlan?.nutrients?.fat}</p>
                    <p>Total Protein: {mealPlan?.nutrients?.protein}</p>
                </div>
            }
            {meals?.map(meal => (
                <div key={meal.id}>
                    <a href={meal.sourceUrl} target='_blank'>
                        <h2>
                            {meal.title}
                        </h2>
                    </a>
                    <br/>
                    <img src={meal.imgSrc} />
                    <p>Servings: {meal.servings}</p>
                    <p>Ready in {meal.readyInMinutes} minutes</p>
                </div>
            ))}

            <button onClick={generatePDF}>Print</button>
            {doc && <PDFViewer>{doc}</PDFViewer>}
        </div>
    );
}

export default MealPlanShow;