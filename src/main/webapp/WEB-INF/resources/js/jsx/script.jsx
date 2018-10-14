import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

export class AggregatedModels extends Component{
    render(){
        var modelRows = this.props.data.map((model, i) => {
            let years = model[2].split(",").map((year, j) => { // build horizontal list of model years
                return(
                    <li key={j}><a href={'/bike/' + model[0] + '/' + model[1] + '/' + year}>{year}</a></li>
                )
            });
            return(
                <tr key={i}>
                    <td>
                        {model[0]}
                    </td>
                    <td>
                        {model[1]}
                    </td>
                    <td className="yearColumn">
                        <ul>
                            {years}
                        </ul>
                    </td>
                </tr>
            );
        });

        return(
            <table className="model-table">
                <tbody>
                <tr>
                    <th>Производитель</th>
                    <th>Модель</th>
                    <th>Год выпуска</th>
                </tr>
                {modelRows}
                </tbody>
            </table>
        );
    }
}

export class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {data: undefined, offset: 0, sizePerPage: props.sizePerPage, pageCount: Math.ceil(props.models.length/props.sizePerPage)};
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getPageOfData(props, offset) {
        let pageOfData = props.models.slice(offset * props.sizePerPage, (offset + 1) * props.sizePerPage);
        this.setState({data: pageOfData, offset: offset});
    }

    componentWillMount() {
        this.getPageOfData(this.props, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps != this.props) {
            this.getPageOfData(nextProps, 0);
            this.setState({pageCount: Math.ceil(nextProps.models.length/nextProps.sizePerPage)})
        }
    }

    handlePageClick(data) {
        this.setState({offset: data.selected}, () => {
            this.getPageOfData(this.props, data.selected);
        });
    };

    render() {
        if (!this.state.data) {
            return (
                <div>Загрузка...</div>
            );
        } else
        if (this.state.data.length == 0) {
            return (
                <div>Поиск не дал результатов</div>
            );
        } else {
            return(
                <div>
                    <AggregatedModels data={this.state.data}/>
                    <div className="paginationDiv">
                        <ReactPaginate previousLabel={"назад"}
                                       nextLabel={"вперед"}
                                       breakLabel={<a href="">...</a>}
                                       breakClassName={"break-me"}
                                       pageCount={this.state.pageCount}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={2}
                                       initialPage={this.state.offset}
                                       forcePage={this.state.offset}
                                       onPageChange={this.handlePageClick}
                                       containerClassName={"pagination"}
                                       subContainerClassName={"pages pagination"}
                                       activeClassName={"active"} />
                    </div>
                </div>
            );
        }
    }
}

function searchModelsByFilters() {
    $.ajax({  // load all data
        url      : '/ajax/searchModelsAll/',
        data     : {manufacturer: $('#manufacturerSelect').val(),
                    category: $('#categorySelect').val(),
                    engineType: $('#engineTypeSelect').val(),
                    finalDriveType: $('#finalDriveTypeSelect').val(),
                    yearFrom: $('#yearFromSelect').val(),
                    yearTo: $('#yearToSelect').val(),
                    displacementFrom: $('#displacementFromSelect').val(),
                    displacementTo: $('#displacementToSelect').val()},
        traditional: true,
        dataType : 'JSON',
        type     : 'GET',
        success: data => {
            ReactDOM.render(<SearchResult models={data} sizePerPage={30}/>, document.getElementById('searchResult'))
        },
        error: (xhr, status, err) => {
            console.error(status, err.toString());
        }
    });
}

function searchModelsByText() {
    $.ajax({  // load all data
        url      : '/ajax/searchModelsAll/',
        data     : {searchText: $('#searchText').val()},
        traditional: true,
        dataType : 'JSON',
        type     : 'GET',
        success: data => {
            ReactDOM.render(<SearchResult models={data} sizePerPage={30}/>, document.getElementById('searchResult'))
        },
        error: (xhr, status, err) => {
            console.error(status, err.toString());
        }
    });
}

$(document).ready( function() {
    $('#manufacturerSelect').multiselect({
        columns: 1,
        selectAll: true,
        search: true,
        texts: {
            placeholder : 'Выберите производителя',
            selectAll   : 'Выбрать все',
            unselectAll : 'Убрать все',
            noneSelected: 'Не выбрано',
            selectedOptions: ' выбрано',
            search: 'Поиск'
        }
    });

    $('#categorySelect').multiselect({
        columns: 1,
        selectAll: true,
        texts: {
            placeholder : 'Выберите тип мотоцикла',
            selectAll   : 'Выбрать все',
            unselectAll : 'Убрать все',
            noneSelected: 'Не выбрано',
            selectedOptions: ' выбрано'
        }
    });

    $('#engineTypeSelect').multiselect({
        columns: 1,
        selectAll: true,
        texts: {
            placeholder : 'Выберите тип двигателя',
            selectAll   : 'Выбрать все',
            unselectAll : 'Убрать все',
            noneSelected: 'Не выбрано',
            selectedOptions: ' выбрано'
        }
    });

    $('#finalDriveTypeSelect').multiselect({
        columns: 1,
        selectAll: true,
        texts: {
            placeholder : 'Выберите тип привода',
            selectAll   : 'Выбрать все',
            unselectAll : 'Убрать все',
            noneSelected: 'Не выбрано',
            selectedOptions: ' выбрано'
        }
    });

    var thisYear = (new Date()).getFullYear();
    for (var i = thisYear; i >= 1900; i--) {
        $('<option>', {value: i, text: i}).appendTo('.year');
    }

    var displacementArray = [50,125,250,400,600,800,1000];
    for (var i = 0; i < displacementArray.length; i++) {
        $('<option>', {value: displacementArray[i], text: displacementArray[i] + ' см3'}).appendTo('.displacement');
    }

    $('#searchModels').click(function () {
        event.preventDefault();
        searchModelsByFilters();
    });

    $('#searchButton').click(function () {
        event.preventDefault();
        searchModelsByText();
    });
});
