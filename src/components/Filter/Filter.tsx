import './Filter.css';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';
import TagHandler from '../../handlers/tagHandler';

type FilterProps = {
    defaultFilters: string[];
    updateFilters: boolean;
    refreshFilters: (filters: string[]) => void;
}

function Filter(props: FilterProps) {
    const { strings } = useContext(LanguageContext);
    const { setAlertContext } = useContext(AlertContext);
    const userContext = useContext(UserContext);
    const tagHandler = new TagHandler(userContext);

    const [filters, setFilters] = useState(props.defaultFilters);
    const [allFilters, setAllFilters] = useState([] as string[]);

    useEffect(() => {
        if (props.updateFilters) {
            tagHandler.getAllTags().then(
                (value: any) => {
                    let newAllFilters: string[] = [...value];
                    setAllFilters([...newAllFilters, strings.labels.archived]);
                    let newFilters = [...filters, ...newAllFilters.filter((f: string) => !allFilters.includes(f))];
                    setFilters(newFilters);
                    props.refreshFilters(newFilters);
                },
                (error: any) => {
                    setAlertContext(true, error.response.data.message.result);
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
            return className + ' lbl__isActive';
        } else {
            return className + ' lbl__isInactive';
        }
    }

    const noFiltersAppliedMessage = (
        <label className='hor-ver-center-cnt'>{strings.textContent.filterExplanation}</label>
    )

    return (
        <>
            <div className='hor-ver-center-cnt'>
                {allFilters.map((f: string) => (
                    <div key={allFilters.indexOf(f)}>
                        <div className={setActiveClass(f, 'filter__contnr')}>
                            <label className={setActiveClass(f, 'dflt__lbl')} id={f} onClick={toggleFilter}>{f}</label>
                        </div>
                    </div>
                ))}
            </div>
            {filters.length == 0 ? noFiltersAppliedMessage : null}
        </>
    );
};

export default Filter;