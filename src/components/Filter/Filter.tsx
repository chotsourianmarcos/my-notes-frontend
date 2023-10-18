import './Filter.css';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';
import TagHandler from '../../handlers/tagHandler';

type FilterProps = {
    defaultFilters: string[];
    updateFilters: boolean;
    refreshFilters: (filters: string[]) => void;
}

function Filter(props: FilterProps) {
    const { setAlertContext } = useContext(AlertContext);
    const { user } = useContext(UserContext);
    const tagHandler = new TagHandler(user);

    const [filters, setFilters] = useState(props.defaultFilters);
    const [allFilters, setAllFilters] = useState([] as string[]);

    useEffect(() => {
        if (props.updateFilters) {
            tagHandler.getAllTags().then(
                (value: any) => {
                    let newAllFilters: string[] = [...value, 'archived'];
                    setAllFilters(newAllFilters);
                    let newFilters = [...filters, ...newAllFilters.filter((f: string) => !allFilters.includes(f))];
                    setFilters(newFilters);
                    props.refreshFilters(newFilters);
                },
                (error: any) => {
                    setAlertContext(
                        {
                            isOpen: true,
                            modalText: error.response.data.message.result,
                            isConfirm: false,
                            onClose(accept: boolean) { }
                        });
                }
            )
        }
    }, [props.updateFilters]);


    const toggleFilter = (event: any) => {
        const value = event.target.id;
        let newFilters: string[] = [];
        if (filters.includes(value)) {
            filters.forEach(f => {
                if (f !== value) {
                    newFilters.push(f);
                }
            });
            setFilters(newFilters);
        } else {
            newFilters = [...filters];
            newFilters.push(value);
            setFilters(newFilters);
        }
        props.refreshFilters(newFilters);
    }

    const setActiveClass = (filter: string, className: string) => {
        if (filters.includes(filter)) {
            return className + ' filter__isActive';
        } else {
            return className + ' filter__isInactive';
        }
    }

    const noFiltersAppliedMessage = (
        <label className='hor-ver-center-cnt'>Click on any amount of filters to get a specific subset of notes.</label>
    )

    return (
        <>
            <div className='hor-ver-center-cnt'>
                {allFilters.map((f: string) => (
                    <div key={allFilters.indexOf(f)}>
                        <div className={setActiveClass(f, 'filter__contnr')}>
                            <label className={setActiveClass(f, 'filter__lbl')} id={f} onClick={toggleFilter}>{f}</label>
                        </div>
                    </div>
                ))}
            </div>
            {filters.length == 0 ? noFiltersAppliedMessage : null}
        </>
    );
};

export default Filter;