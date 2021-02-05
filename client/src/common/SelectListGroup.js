import React from 'react'
import classnames from 'classnames'

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options,
    type
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
    return(
        <div className="form-group">
            <select  type={type} 
            className={classnames('form-control', {'is-invalid': error})} 
            
            value={value}
            onChange={onChange}
            name={name}
           >

            {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
           {error}
        </div>
    )
}

export default SelectListGroup;