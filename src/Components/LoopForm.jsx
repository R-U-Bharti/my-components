import { useFormik } from 'formik'
import * as yup from 'yup'
import Select from 'react-select'

const FormOne = ({ next, prev, style, formIndex }) => {

    const validationSchema = yup.object().shape({

    })

    const formik = useFormik({
        initialValues: {

        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            submitFun(values)
        }
    })

    const submitFun = (values) => {
        console.log(values)
        next()
    }

    const fields = [
        { name: "", label: "Driver Name", type: 'text', placeholder: "", required: false },
        { name: "", label: "Operator Type", type: 'react-select', placeholder: "Select Mobile Operator", required: false },
        { name: "", label: "License Type", type: 'select', placeholder: "", required: false },
        { name: "", label: "Driver Pic One", type: 'file', placeholder: "", required: false },
    ]

    const handleChange = (name, obj) => {
        formik.setFieldValue(name, obj?.value)
    }

    const handleFileChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

    }

    const renderFields = (elem) => {

        switch (elem.type) {
            case 'react-select': {
                return <Select onChange={(obj) => handleChange(elem.name, obj)} placeholder={elem?.placeholder} name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : ''} options={elem?.options} />
            };

            case 'select': {
                return <select name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'}>
                    {elem?.placeholder && <option selected value="">{elem?.placeholder}</option>}
                    {
                        elem?.data?.map((item, index) =>
                            <option key={index} selected={index === 1} value={item[elem?.optionValue]}>{item[elem?.optionView]}</option>
                        )
                    }
                </select>
            };

            case 'file': {
                return <input onChange={e => handleFileChange(e)} type="file" name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'} id="" />
            };

            default: {
                return <input type={elem?.type} name={elem?.name} className={(formik.errors[elem.name] && formik.touched[elem.name]) ? 'fieldError' : 'fieldStyle'} id="" placeholder={elem?.placeholder} />
            }
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className={`${style?.formStyle} animate__animated animate__slideInRight animate__faster ${formIndex == 1 ? "flex" : 'hidden'}`}>

                <div className="w-full">
                    <div className='fieldWrap w-full md:w-[32%]'>
                        <label htmlFor={"ownershipType"} className={`labelStyle asterisk`}>Ownership Type:</label>
                        <select name={"ownershipType"} className={(formik.errors?.ownershipType && formik.touched?.ownershipType) ? 'fieldError' : 'fieldStyle'}>
                            {
                                []?.map((item, index) =>
                                    <option key={index} selected={index === 1} value={item[elem?.optionValue]}>{item[elem?.optionView]}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                {
                    fields?.map((elem, index) =>
                        <div key={index} className='fieldWrap w-full md:w-[32%]'>
                            <label htmlFor={elem?.name} className={`labelStyle ${elem?.required && "asterisk"}`}>{elem?.label}:</label>
                            {renderFields(elem)}
                        </div>
                    )
                }

                <div className='flex justify-end w-full'>
                    <button className={style?.buttonStyle} type='submit'>Next</button>
                </div>
            </form>
        </>
    )
}

export default FormOne