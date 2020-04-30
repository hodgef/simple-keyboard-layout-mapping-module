class LayoutMapping {
  init(keyboard) {
    /**
     * Registering module
     */
    keyboard.registerModule("layoutMapping", module => {
      let { sourceLayout, targetLayout } = keyboard.options;

      module.fn = {};
      module.fn.handleButtonClicked = keyboard.handleButtonClicked;

      keyboard.handleButtonClicked = button => {
        console.log("** SOURCE BUTTON ***", button);
        const targetButton = module.getButtonInTargetLayout(button);
        console.log("** TARGET BUTTON ***", targetButton);
        module.fn.handleButtonClicked(targetButton);
      };

      module.getButtonInTargetLayout = button => {
        const sourceButtonElement = module.getButtonInLayout(button);
        if (!sourceButtonElement) return;

        const skbtnuid = sourceButtonElement.getAttribute("data-skbtnuid");
        const [sourceButtonLayoutName, sourceBtnLocation] = skbtnuid.split("-");
        const [sourceBtnRow, sourceBtnIndex] = sourceBtnLocation
          .replace("r", "")
          .split("b");

        const targetButton = module.findLayoutKeyByIndex(
          sourceBtnRow,
          sourceBtnIndex,
          targetLayout,
          sourceButtonLayoutName
        );

        return targetButton;
      };

      /**
       * Get button in layout
       */
      module.getButtonInLayout = layoutKeyName => {
        let buttonElement =
          keyboard.getButtonElement(layoutKeyName) ||
          keyboard.getButtonElement(`{${layoutKeyName}}`);

        return buttonElement;
      };

      /**
       * Find layout key by index
       */
      module.findLayoutKeyByIndex = (
        rIndex,
        bIndex,
        layout,
        layoutName = keyboard.options.layoutName
      ) => {
        let row = layout[layoutName][rIndex];

        if (row) {
          let rowButtons = row.split(" ");
          return rowButtons[bIndex];
        }
      };

      /**
       * Start module
       */
      module.start = () => {
        keyboard.setOptions({
          layout: sourceLayout
        });
      };

      module.start();
    });
  }
}

export default LayoutMapping;
