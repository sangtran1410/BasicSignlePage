import React, { Component, PropTypes } from 'react'
import { SketchPicker, SwatchesPicker, ChromePicker, PhotoshopPicker, GithubPicker, HuePicker, AlphaPicker, BlockPicker, TwitterPicker, CirclePicker, SliderPicker, CompactPicker, MaterialPicker } from 'react-color';

export default class ColorPicker extends Component {
    static propTypes = {
    }
    static contextTypes = {
        i18n: PropTypes.func.isRequired
    }

	state = {
        background: 'none'
    }

    handleChangeComplete(e) {
        console.log(e)
        this.setState({background: e.hex})
    }

    render() {
        const { background } = this.state
        const style = {
            border: `5px dashed ${background}`
        }
        return (
            <div className="container" style={style}>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color SketchPicker:</h3>
                        <SketchPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color SwatchesPicker:</h3>
                        <SwatchesPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color ChromePicker:</h3>
                        <ChromePicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color PhotoshopPicker:</h3>
                        <PhotoshopPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color GithubPicker:</h3>
                        <GithubPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color HuePicker:</h3>
                        <HuePicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color AlphaPicker:</h3>
                        <AlphaPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color BlockPicker:</h3>
                        <BlockPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color TwitterPicker:</h3>
                        <TwitterPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color CirclePicker:</h3>
                        <CirclePicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color SliderPicker:</h3>
                        <SliderPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Color CompactPicker:</h3>
                        <CompactPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>Color MaterialPicker:</h3>
                        <MaterialPicker
                            color={ this.state.background }
                            onChangeComplete={ (e) => this.handleChangeComplete(e) }/>
                    </div>
                </div>
			</div>
        )
    }
}
