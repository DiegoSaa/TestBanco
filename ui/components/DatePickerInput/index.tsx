import React, { useState } from "react";
import { TextInput, Text, View, Modal, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";

const DatePickerInput = ({ name, value, onChange, errors, touched }) => {
    const [show, setShow] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            onChange(name, formattedDate);
        }
    };

    const confirmDate = () => {
        setShow(false);
    };

    const tempDate = new Date(value);

    return (
        <View>
            <TextInput
                style={styles.input}
                value={value}
                placeholder={name === "date_release" ? "Release date" : "Revision date"}
                editable={false}
                onTouchStart={() => setShow(true)}
                accessibilityRole='button'
            />
            {touched && errors ? <Text style={styles.error}>{errors}</Text> : null}

            <Modal
                transparent={true}
                visible={show}
                animationType='slide'
                onRequestClose={() => setShow(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        width: '80%',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <DateTimePicker
                            value={tempDate}
                            mode='date'
                            display='spinner'
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                        />
                        <Button title='Done' onPress={confirmDate} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DatePickerInput;
