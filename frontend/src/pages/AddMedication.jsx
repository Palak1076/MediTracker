import React from 'react';
import MedicationForm from '../components/medications/MedicationForm';
import { useTheme } from '../context/ThemeContext';
import DarkModeSwitch from '../components/common/DarkModeSwitch';

const AddMedication = () => {
    return (
        <div>
            <MedicationForm isEditing={false} />
        </div>
    );
};

export default AddMedication;