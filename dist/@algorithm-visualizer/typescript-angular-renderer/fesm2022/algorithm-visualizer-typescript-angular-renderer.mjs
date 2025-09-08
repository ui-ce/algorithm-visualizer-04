import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, Component, ViewChild } from '@angular/core';
import * as i4 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i2 from 'primeng/knob';
import { KnobModule } from 'primeng/knob';
import * as i3 from 'primeng/slider';
import { SliderModule } from 'primeng/slider';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from 'primeng/card';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import cytoscape from 'cytoscape';
import * as i1$2 from 'primeng/selectbutton';
import { SelectButtonModule } from 'primeng/selectbutton';

class WebPlayer {
    animationLength;
    frameIndex = 0;
    frameTime = 200;
    frameIndexChange = new EventEmitter();
    playing = false;
    _timer;
    ngOnDestroy() {
        this.stop();
    }
    play() {
        if (!this.animationLength) {
            return;
        }
        this.playing = true;
        this._timer = setInterval(() => this.next(), this.frameTime);
    }
    stop() {
        this.playing = false;
        if (this._timer) {
            clearInterval(this._timer);
        }
    }
    togglePlay() {
        if (this.playing) {
            this.stop();
            return;
        }
        this.play();
    }
    next() {
        this.frameIndex = Math.min(this.frameIndex + 1, this.animationLength - 1);
        this.frameIndexChange.emit(this.frameIndex);
        if (this.frameIndex === this.animationLength - 1) {
            this.stop();
        }
    }
    prev() {
        if (!this.animationLength) {
            return;
        }
        this.frameIndex = Math.max(this.frameIndex - 1, 0);
        this.frameIndexChange.emit(this.frameIndex);
    }
    first() {
        this.frameIndex = 0;
        this.frameIndexChange.emit(this.frameIndex);
    }
    last() {
        if (!this.animationLength) {
            return;
        }
        this.frameIndex = this.animationLength - 1;
        this.frameIndexChange.emit(this.frameIndex);
    }
    onFrameTimeChanged(frameTime) {
        this.frameTime = frameTime;
        if (!this.playing) {
            return;
        }
        clearInterval(this._timer);
        this._timer = setInterval(() => this.next(), this.frameTime);
    }
    onFrameIndexChanged(frameIndex) {
        this.frameIndex = frameIndex;
        this.frameIndexChange.emit(this.frameIndex);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebPlayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: WebPlayer, isStandalone: true, selector: "web-player", inputs: { animationLength: "animationLength", frameIndex: "frameIndex", frameTime: "frameTime" }, outputs: { frameIndexChange: "frameIndexChange" }, ngImport: i0, template: "<div class=\"toolbar\">\r\n  <div class=\"player\">\r\n    <p-button [size]=\"'small'\" (click)=\"first()\" icon=\"pi pi-angle-double-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"prev()\" icon=\"pi pi-angle-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"togglePlay()\" [icon]=\"this.playing ? 'pi pi-spin pi-spinner' : 'pi pi-play'\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"next()\" icon=\"pi pi-angle-right\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"last()\" icon=\"pi pi-angle-double-right\"/>\r\n  </div>\r\n\r\n  <div class=\"frame-slider\">\r\n    <span>{{ frameIndex + 1 }} / {{ animationLength || 1 }}</span>\r\n    <p-slider [ngModel]=\"frameIndex\" (ngModelChange)=\"onFrameIndexChanged($event)\" [min]=\"0\" [max]=\"(animationLength ?? 1) - 1\" class=\"slider\"/>\r\n  </div>\r\n\r\n  <p-knob [ngModel]=\"frameTime\" (ngModelChange)=\"onFrameTimeChanged($event)\" [size]=\"65\" [min]=\"1\" [max]=\"1000\" valueTemplate=\"{value}ms\"/>\r\n</div>\r\n", styles: [".toolbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.toolbar .player{display:flex;flex-direction:row;align-items:center;gap:.25rem}.toolbar .frame-slider{position:absolute;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;width:10rem;gap:.5rem;color:gray;font-weight:700}.toolbar .frame-slider .slider{width:100%}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: KnobModule }, { kind: "component", type: i2.Knob, selector: "p-knob", inputs: ["styleClass", "ariaLabel", "ariaLabelledBy", "tabindex", "valueColor", "rangeColor", "textColor", "valueTemplate", "size", "min", "max", "step", "strokeWidth", "showValue", "readonly"], outputs: ["onChange"] }, { kind: "ngmodule", type: SliderModule }, { kind: "component", type: i3.Slider, selector: "p-slider", inputs: ["animate", "min", "max", "orientation", "step", "range", "styleClass", "ariaLabel", "ariaLabelledBy", "tabindex", "autofocus"], outputs: ["onChange", "onSlideEnd"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: i4.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "raised", "rounded", "text", "plain", "severity", "outlined", "link", "tabindex", "size", "variant", "style", "styleClass", "badgeClass", "badgeSeverity", "ariaLabel", "buttonProps", "autofocus", "fluid"], outputs: ["onClick", "onFocus", "onBlur"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebPlayer, decorators: [{
            type: Component,
            args: [{ selector: 'web-player', imports: [FormsModule, KnobModule, SliderModule, ButtonModule], template: "<div class=\"toolbar\">\r\n  <div class=\"player\">\r\n    <p-button [size]=\"'small'\" (click)=\"first()\" icon=\"pi pi-angle-double-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"prev()\" icon=\"pi pi-angle-left\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"togglePlay()\" [icon]=\"this.playing ? 'pi pi-spin pi-spinner' : 'pi pi-play'\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"next()\" icon=\"pi pi-angle-right\"/>\r\n    <p-button [size]=\"'small'\" (click)=\"last()\" icon=\"pi pi-angle-double-right\"/>\r\n  </div>\r\n\r\n  <div class=\"frame-slider\">\r\n    <span>{{ frameIndex + 1 }} / {{ animationLength || 1 }}</span>\r\n    <p-slider [ngModel]=\"frameIndex\" (ngModelChange)=\"onFrameIndexChanged($event)\" [min]=\"0\" [max]=\"(animationLength ?? 1) - 1\" class=\"slider\"/>\r\n  </div>\r\n\r\n  <p-knob [ngModel]=\"frameTime\" (ngModelChange)=\"onFrameTimeChanged($event)\" [size]=\"65\" [min]=\"1\" [max]=\"1000\" valueTemplate=\"{value}ms\"/>\r\n</div>\r\n", styles: [".toolbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.toolbar .player{display:flex;flex-direction:row;align-items:center;gap:.25rem}.toolbar .frame-slider{position:absolute;left:50%;transform:translate(-50%);display:flex;flex-direction:column;align-items:center;width:10rem;gap:.5rem;color:gray;font-weight:700}.toolbar .frame-slider .slider{width:100%}\n"] }]
        }], propDecorators: { animationLength: [{
                type: Input
            }], frameIndex: [{
                type: Input
            }], frameTime: [{
                type: Input
            }], frameIndexChange: [{
                type: Output
            }] } });

class Array2DHighlightLayer {
    colors;
    value;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DHighlightLayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: Array2DHighlightLayer, isStandalone: true, selector: "array-2d-highlight-layer", inputs: { colors: "colors", value: "value" }, ngImport: i0, template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <array-2d-highlight-layer [colors]=\"colors.slice(1)\" [value]=\"value\"></array-2d-highlight-layer>\r\n  } @else {\r\n    <span>{{ value }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"], dependencies: [{ kind: "component", type: Array2DHighlightLayer, selector: "array-2d-highlight-layer", inputs: ["colors", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DHighlightLayer, decorators: [{
            type: Component,
            args: [{ selector: 'array-2d-highlight-layer', imports: [], template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <array-2d-highlight-layer [colors]=\"colors.slice(1)\" [value]=\"value\"></array-2d-highlight-layer>\r\n  } @else {\r\n    <span>{{ value }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"] }]
        }], propDecorators: { colors: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

class Array2DRenderer {
    state;
    metadata;
    getMinHeight() {
        return this.metadata?.minHeight ?? '100px';
    }
    getDefaultColor() {
        return this.metadata?.defaultColor ?? 'white';
    }
    getCellSize() {
        return this.metadata?.cellSize ?? '50px';
    }
    getCellColors(cell) {
        return cell.highlightTags.map((tag) => {
            const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
            return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: Array2DRenderer, isStandalone: true, selector: "array-2d-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"table-container\">\r\n    <table class=\"array2d-table\">\r\n      @for (row of state?.values; track $index) {\r\n        <tr>\r\n          @for (cell of row; track $index) {\r\n            <td [style.background-color]=\"getDefaultColor()\" [style.width]=\"getCellSize()\" [style.height]=\"getCellSize()\">\r\n              @let colors = getCellColors(cell);\r\n              @if (colors.length !== 0) {\r\n                <array-2d-highlight-layer [colors]=\"getCellColors(cell)\" [value]=\"cell.value\"/>\r\n              } @else {\r\n                <span>{{ cell.value }}</span>\r\n              }\r\n            </td>\r\n          }\r\n        </tr>\r\n      }\r\n    </table>\r\n  </div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}:host .table-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center}:host .table-container .array2d-table{border-collapse:collapse}:host .table-container .array2d-table td{border:2px solid #ccc;text-align:center;vertical-align:middle}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: Array2DHighlightLayer, selector: "array-2d-highlight-layer", inputs: ["colors", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: Array2DRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'array-2d-renderer', imports: [CommonModule, CardModule, FormsModule, TableModule, Array2DHighlightLayer], template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"table-container\">\r\n    <table class=\"array2d-table\">\r\n      @for (row of state?.values; track $index) {\r\n        <tr>\r\n          @for (cell of row; track $index) {\r\n            <td [style.background-color]=\"getDefaultColor()\" [style.width]=\"getCellSize()\" [style.height]=\"getCellSize()\">\r\n              @let colors = getCellColors(cell);\r\n              @if (colors.length !== 0) {\r\n                <array-2d-highlight-layer [colors]=\"getCellColors(cell)\" [value]=\"cell.value\"/>\r\n              } @else {\r\n                <span>{{ cell.value }}</span>\r\n              }\r\n            </td>\r\n          }\r\n        </tr>\r\n      }\r\n    </table>\r\n  </div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}:host .table-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center}:host .table-container .array2d-table{border-collapse:collapse}:host .table-container .array2d-table td{border:2px solid #ccc;text-align:center;vertical-align:middle}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

class ChartHighlightLayer {
    colors;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartHighlightLayer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: ChartHighlightLayer, isStandalone: true, selector: "chart-highlight-layer", inputs: { colors: "colors" }, ngImport: i0, template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <chart-highlight-layer [colors]=\"colors.slice(1)\"></chart-highlight-layer>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"], dependencies: [{ kind: "component", type: ChartHighlightLayer, selector: "chart-highlight-layer", inputs: ["colors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartHighlightLayer, decorators: [{
            type: Component,
            args: [{ selector: 'chart-highlight-layer', imports: [Array2DHighlightLayer], template: "<div class=\"highlight-layer\" [style.background-color]=\"colors[0]\">\r\n  @if (colors.length > 1) {\r\n    <chart-highlight-layer [colors]=\"colors.slice(1)\"></chart-highlight-layer>\r\n  }\r\n</div>\r\n", styles: [":host{width:100%;height:100%}:host .highlight-layer{width:100%;height:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;padding:.25rem}\n"] }]
        }], propDecorators: { colors: [{
                type: Input
            }] } });

class ChartRenderer {
    state;
    metadata;
    getBarColors(highlightTags) {
        return highlightTags.map((tag) => {
            const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
            return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
        });
    }
    getBarHeight(value) {
        return `calc(${(value / Math.max(...this.state.bars.map((bar) => bar.value), 1)) * 100}% - 2rem)`;
    }
    getDefaultColor() {
        return this.metadata?.defaultColor ?? 'white';
    }
    getBarWidth() {
        return this.metadata?.barWidth ?? '40px';
    }
    getBarGap() {
        return this.metadata?.barGap ?? '10px';
    }
    getChartHeight() {
        return this.metadata?.chartHeight ?? '200px';
    }
    getShowLabel() {
        return this.metadata?.showLabel ?? true;
    }
    getShowValue() {
        return this.metadata?.showValue ?? true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: ChartRenderer, isStandalone: true, selector: "chart-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<p-card>\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"chart\" [style.height]=\"getChartHeight()\" [style.gap]=\"getBarGap()\">\r\n    @for (bar of state?.bars; track $index) {\r\n      <div class=\"bar-container\" [style.width]=\"getBarWidth()\">\r\n        @if (getShowValue()) {\r\n          <div class=\"value\">{{ bar.value }}</div>\r\n        }\r\n        <div class=\"bar\" [style.height]=\"getBarHeight(bar.value)\" [style.background-color]=\"getDefaultColor()\">\r\n          @let colors = getBarColors(bar.highlightTags);\r\n          @if (colors.length !== 0) {\r\n            <chart-highlight-layer [colors]=\"colors\"></chart-highlight-layer>\r\n          }\r\n        </div>\r\n        @if (getShowLabel()) {\r\n          <div class=\"label\">{{ bar.label }}</div>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}.chart{display:flex;flex-direction:row;align-items:flex-end;justify-content:center}.chart .bar-container{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}.chart .bar-container .bar{display:flex;align-items:flex-end;justify-content:center;background:transparent;border:2px solid #ccc;border-radius:5px;width:100%;overflow:hidden}.chart .bar-container .value,.chart .bar-container .label{margin-top:.5rem;font-size:.9rem;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: ChartHighlightLayer, selector: "chart-highlight-layer", inputs: ["colors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: ChartRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'chart-renderer', imports: [CommonModule, CardModule, FormsModule, TableModule, ChartHighlightLayer], template: "<p-card>\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"chart\" [style.height]=\"getChartHeight()\" [style.gap]=\"getBarGap()\">\r\n    @for (bar of state?.bars; track $index) {\r\n      <div class=\"bar-container\" [style.width]=\"getBarWidth()\">\r\n        @if (getShowValue()) {\r\n          <div class=\"value\">{{ bar.value }}</div>\r\n        }\r\n        <div class=\"bar\" [style.height]=\"getBarHeight(bar.value)\" [style.background-color]=\"getDefaultColor()\">\r\n          @let colors = getBarColors(bar.highlightTags);\r\n          @if (colors.length !== 0) {\r\n            <chart-highlight-layer [colors]=\"colors\"></chart-highlight-layer>\r\n          }\r\n        </div>\r\n        @if (getShowLabel()) {\r\n          <div class=\"label\">{{ bar.label }}</div>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}.chart{display:flex;flex-direction:row;align-items:flex-end;justify-content:center}.chart .bar-container{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}.chart .bar-container .bar{display:flex;align-items:flex-end;justify-content:center;background:transparent;border:2px solid #ccc;border-radius:5px;width:100%;overflow:hidden}.chart .bar-container .value,.chart .bar-container .label{margin-top:.5rem;font-size:.9rem;text-align:center}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

class GraphRenderer {
    state;
    metadata;
    cyContainer;
    circleLayout = { name: 'circle' };
    concentricLayout = {
        name: 'concentric',
        minNodeSpacing: 30,
    };
    breadthFirstLayout = {
        name: 'breadthfirst',
    };
    layoutOptions = [
        { label: 'Circle', value: this.circleLayout },
        { label: 'Concentric', value: this.concentricLayout },
        { label: 'Breadth First ', value: this.breadthFirstLayout },
    ];
    _currentLayout = this.circleLayout;
    _isInitialized = false;
    _cy;
    get minHeight() {
        return this.metadata?.minHeight ?? '400px';
    }
    ngAfterViewInit() {
        this.renderGraph();
        this._isInitialized = true;
    }
    ngOnChanges(changes) {
        if ((changes['state'] || changes['metadata']) && this.cyContainer && this._isInitialized) {
            this.renderGraph();
        }
    }
    ngOnDestroy() {
        this._cy?.destroy();
        this._cy = undefined;
    }
    changeLayout(layout) {
        this._currentLayout = layout;
        if (this._cy) {
            this._cy
                .layout({ ...this._currentLayout, animate: true, animationDuration: 500 })
                .run();
        }
    }
    renderGraph() {
        if (!this.state || !this.cyContainer)
            return;
        const nodeTagColors = {};
        this.metadata?.nodeHighlightTags?.forEach((tag) => (nodeTagColors[tag.tag] = tag.color));
        const edgeTagColors = {};
        this.metadata?.edgeHighlightTags?.forEach((tag) => (edgeTagColors[tag.tag] = tag.color));
        const defaultNodeColor = this.metadata?.defaultNodeColor ?? '#ffffff';
        const defaultEdgeColor = this.metadata?.defaultEdgeColor ?? '#000000';
        const elements = [
            ...this.state.nodes.map((n) => {
                const highlightTag = n.highlightTags.at(-1);
                return {
                    data: {
                        id: n.id,
                        label: n.label,
                        color: highlightTag
                            ? (nodeTagColors[highlightTag] ?? defaultNodeColor)
                            : defaultNodeColor,
                    },
                };
            }),
            ...this.state.edges.map((e) => {
                const highlightTag = e.highlightTags.at(-1);
                return {
                    data: {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        label: e.label,
                        color: highlightTag
                            ? (edgeTagColors[highlightTag] ?? defaultEdgeColor)
                            : defaultEdgeColor,
                        weight: parseFloat(e.label) || 1,
                    },
                };
            }),
        ];
        if (!this._cy) {
            this._cy = cytoscape({
                container: this.cyContainer.nativeElement,
                elements,
                layout: this._currentLayout,
                style: [
                    {
                        selector: 'node',
                        style: {
                            width: 40,
                            height: 40,
                            'background-color': 'data(color)',
                            label: 'data(label)',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'border-width': 1,
                            'border-color': '#000',
                            color: '#000',
                            'font-size': 14,
                        },
                    },
                    {
                        selector: 'edge',
                        style: {
                            'line-color': 'data(color)',
                            'target-arrow-shape': 'triangle',
                            'target-arrow-color': 'data(color)',
                            'curve-style': 'bezier',
                            label: 'data(label)',
                            'text-background-color': '#fff',
                            'text-background-opacity': 1,
                            color: '#000',
                            'font-size': 14,
                            width: 3.5,
                        },
                    },
                ],
            });
            return;
        }
        this._cy.batch(() => {
            const currentIds = new Set(elements.map((element) => element.data.id));
            this._cy.elements().forEach((element) => {
                if (!currentIds.has(element.id())) {
                    element.remove();
                    if (element._private.group !== 'edges') {
                        this._cy.layout(this._currentLayout).run();
                    }
                }
            });
            for (const element of elements) {
                const existing = this._cy.getElementById(element.data.id);
                if (existing.nonempty()) {
                    existing.data(element.data);
                }
                else {
                    this._cy.add(element);
                    if (!('source' in element.data)) {
                        this._cy.layout(this._currentLayout).run();
                    }
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: GraphRenderer, isStandalone: true, selector: "graph-renderer", inputs: { state: "state", metadata: "metadata" }, viewQueries: [{ propertyName: "cyContainer", first: true, predicate: ["cyContainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<p-card>\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n\r\n      <div class=\"layout-toolbar p-fluid p-formgrid p-grid\" style=\"gap: 1rem;\">\r\n        <div class=\"p-field p-col-12 p-md-4\">\r\n          <p-selectbutton [options]=\"layoutOptions\" [ngModel]=\"circleLayout\" (ngModelChange)=\"changeLayout($event)\" optionLabel=\"label\" optionValue=\"value\" aria-labelledby=\"basic\"/>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div #cyContainer class=\"graph\" [style.height]=\"minHeight\"></div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .graph{width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: SelectButtonModule }, { kind: "component", type: i1$2.SelectButton, selector: "p-selectButton, p-selectbutton, p-select-button", inputs: ["options", "optionLabel", "optionValue", "optionDisabled", "unselectable", "tabindex", "multiple", "allowEmpty", "styleClass", "ariaLabelledBy", "dataKey", "autofocus", "size", "fluid"], outputs: ["onOptionClick", "onChange"] }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: GraphRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'graph-renderer', standalone: true, imports: [CommonModule, SelectButtonModule, CardModule, FormsModule], template: "<p-card>\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n\r\n      <div class=\"layout-toolbar p-fluid p-formgrid p-grid\" style=\"gap: 1rem;\">\r\n        <div class=\"p-field p-col-12 p-md-4\">\r\n          <p-selectbutton [options]=\"layoutOptions\" [ngModel]=\"circleLayout\" (ngModelChange)=\"changeLayout($event)\" optionLabel=\"label\" optionValue=\"value\" aria-labelledby=\"basic\"/>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div #cyContainer class=\"graph\" [style.height]=\"minHeight\"></div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .graph{width:100%}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }], cyContainer: [{
                type: ViewChild,
                args: ['cyContainer', { static: true }]
            }] } });

class LogRenderer {
    state;
    metadata;
    getMinHeight() {
        return this.metadata?.minHeight ?? '100px';
    }
    getColor() {
        return this.metadata?.defaultColor ?? 'black';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: LogRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.2.4", type: LogRenderer, isStandalone: true, selector: "log-renderer", inputs: { state: "state", metadata: "metadata" }, ngImport: i0, template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"message\" [style.color]=\"getColor()\">{{ state.message }}</div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .message{width:100%;text-align:center;font-size:1.25rem;font-weight:700}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: CardModule }, { kind: "component", type: i1$1.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: LogRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'log-renderer', imports: [CommonModule, CardModule, FormsModule], template: "<p-card [style.min-height]=\"getMinHeight()\">\r\n  <ng-template #header>\r\n    <div class=\"header\">\r\n      <span class=\"title\">{{ state?.name }}</span>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <div class=\"message\" [style.color]=\"getColor()\">{{ state.message }}</div>\r\n</p-card>\r\n", styles: [":host{display:block;width:100%}:host .message{width:100%;text-align:center;font-size:1.25rem;font-weight:700}:host .header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:1rem}:host .header .title{font-size:1.5rem;font-weight:700}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }], metadata: [{
                type: Input
            }] } });

class WebRenderer {
    animation;
    rendererMetadata;
    frameIndex = 0;
    hasPlayer = true;
    get currentFrame() {
        return (this.animation?.[Math.max(0, Math.min(this.frameIndex, this.animation.length - 1))] ?? null);
    }
    getDocumentName() {
        return this.rendererMetadata?.documentName ?? 'Algorithm';
    }
    onFrameIndexChange(frameIndex) {
        this.frameIndex = frameIndex;
    }
    convertToGraphState(state) {
        return state;
    }
    convertToChartState(state) {
        return state;
    }
    convertToArray2dState(state) {
        return state;
    }
    convertToLogState(state) {
        return state;
    }
    getMetaData(type, id) {
        return this.rendererMetadata?.objectMetaData?.find((objectMetadataEntry) => objectMetadataEntry.type === type)?.metadata;
    }
    convertToGraphMetadata(metadata) {
        return metadata;
    }
    convertToChartMetaData(metadata) {
        return metadata;
    }
    convertToArray2DMetaData(metadata) {
        return metadata;
    }
    convertToLogMetaData(metadata) {
        return metadata;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebRenderer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.2.4", type: WebRenderer, isStandalone: true, selector: "web-renderer", inputs: { animation: "animation", rendererMetadata: "rendererMetadata", frameIndex: "frameIndex", hasPlayer: "hasPlayer" }, ngImport: i0, template: "@if (hasPlayer) {\r\n  <web-player [animationLength]=\"animation?.length\" (frameIndexChange)=\"onFrameIndexChange($event)\"></web-player>\r\n}\r\n\r\n<span class=\"title\">{{ getDocumentName() }}</span>\r\n\r\n@if (currentFrame; as frame) {\r\n  @for (frameState of frame; track $index) {\r\n    @switch (frameState.type) {\r\n      @case ('Graph') {\r\n        <graph-renderer [state]=\"convertToGraphState(frameState.state)\" [metadata]=\"convertToGraphMetadata(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Log') {\r\n        <log-renderer [state]=\"convertToLogState(frameState.state)\" [metadata]=\"convertToLogMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Array2D') {\r\n        <array-2d-renderer [state]=\"convertToArray2dState(frameState.state)\" [metadata]=\"convertToArray2DMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Chart') {\r\n        <chart-renderer [state]=\"convertToChartState(frameState.state)\" [metadata]=\"convertToChartMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n    }\r\n  }\r\n}\r\n", styles: [":host{padding:.5rem;display:flex;flex-direction:column;gap:.5rem}:host .title{text-align:left;font-size:1.5rem;font-weight:700;color:#555;padding-inline:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: GraphRenderer, selector: "graph-renderer", inputs: ["state", "metadata"] }, { kind: "ngmodule", type: KnobModule }, { kind: "ngmodule", type: SliderModule }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: LogRenderer, selector: "log-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: Array2DRenderer, selector: "array-2d-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: ChartRenderer, selector: "chart-renderer", inputs: ["state", "metadata"] }, { kind: "component", type: WebPlayer, selector: "web-player", inputs: ["animationLength", "frameIndex", "frameTime"], outputs: ["frameIndexChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.4", ngImport: i0, type: WebRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'web-renderer', imports: [
                        FormsModule,
                        GraphRenderer,
                        KnobModule,
                        SliderModule,
                        ButtonModule,
                        LogRenderer,
                        Array2DRenderer,
                        ChartRenderer,
                        WebPlayer,
                    ], template: "@if (hasPlayer) {\r\n  <web-player [animationLength]=\"animation?.length\" (frameIndexChange)=\"onFrameIndexChange($event)\"></web-player>\r\n}\r\n\r\n<span class=\"title\">{{ getDocumentName() }}</span>\r\n\r\n@if (currentFrame; as frame) {\r\n  @for (frameState of frame; track $index) {\r\n    @switch (frameState.type) {\r\n      @case ('Graph') {\r\n        <graph-renderer [state]=\"convertToGraphState(frameState.state)\" [metadata]=\"convertToGraphMetadata(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Log') {\r\n        <log-renderer [state]=\"convertToLogState(frameState.state)\" [metadata]=\"convertToLogMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Array2D') {\r\n        <array-2d-renderer [state]=\"convertToArray2dState(frameState.state)\" [metadata]=\"convertToArray2DMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n\r\n      @case ('Chart') {\r\n        <chart-renderer [state]=\"convertToChartState(frameState.state)\" [metadata]=\"convertToChartMetaData(getMetaData(frameState.type, frameState.id))\"/>\r\n      }\r\n    }\r\n  }\r\n}\r\n", styles: [":host{padding:.5rem;display:flex;flex-direction:column;gap:.5rem}:host .title{text-align:left;font-size:1.5rem;font-weight:700;color:#555;padding-inline:.5rem}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], rendererMetadata: [{
                type: Input
            }], frameIndex: [{
                type: Input
            }], hasPlayer: [{
                type: Input
            }] } });

/*
 * Public API Surface of typescript-angular-renderer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Array2DHighlightLayer, Array2DRenderer, ChartHighlightLayer, ChartRenderer, GraphRenderer, LogRenderer, WebPlayer, WebRenderer };
//# sourceMappingURL=algorithm-visualizer-typescript-angular-renderer.mjs.map
