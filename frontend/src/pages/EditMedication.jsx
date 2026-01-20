import React from 'react';
import { useParams } from 'react-router-dom';
import MedicationForm from '../components/medications/MedicationForm';

const EditMedication = () => {
    const { id } = useParams();
    
    return (
        <div>
            <MedicationForm isEditing={true} medicationId={id} />
        </div>
    );
};

export default EditMedication;