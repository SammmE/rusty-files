class _Focus {
    constructor() {
        this.selectedDrive = false;
        this.selectedFolder = "";
    }

    selectDrive() {
        this.selectedDrive = true;
    }

    selectFolder(folder) {
        this.selectedFolder = folder;
    }
}

const Focus = new _Focus();

export default Focus;
