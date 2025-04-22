import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, Field} from "formik";
import { setSelectedDate } from "../../store/statistics/slice";
import { MONTHS } from "../../constants";

const startYear = 2020;
const currentYear = new Date().getFullYear();
const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
);

const DateSelectors = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.statistics.selectedDate);

    const handleSubmit = (values) => {
        dispatch(setSelectedDate(values));
    };

    const handleSelectChange = (e, values, handleChange) => {
        handleChange(e);
        const { name, value } = e.target;
        const updatedValues = {
            ...values,
            [name]: parseInt(value),
        };
        handleSubmit(updatedValues);
    };

    return (
        <Formik
            initialValues={selectedDate}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Field as="select" name="month" onChange={(e) => handleSelectChange(e, values, handleChange)}>
                        {MONTHS.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </Field>

                    <Field as="select" name="year" onChange={(e) => handleSelectChange(e, values, handleChange)}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Field>
                </Form>
            )}
        </Formik>
    )
};

export default DateSelectors;