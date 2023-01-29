document.addEventListener('DOMContentLoaded', () => {
  const hybridSoloInit = (elSelect) => {
  const elSelectNative = elSelect.getElementsByClassName("js-select-native")[0];
  const elSelectCustom = elSelect.getElementsByClassName("js-select-custom")[0];
  const elSelectCustomBox = elSelectCustom.children[0];
  const elSelectCustomOpts = elSelectCustom.children[1];
  const customOptsList = Array.from(elSelectCustomOpts.children);
  const optionsCount = customOptsList.length;
  const defaultLabel = elSelectCustomBox.getAttribute("data-value");

  let optionChecked = "";
  let optionHoveredIndex = -1;

  elSelectCustomBox.addEventListener("click", (e) => {
    const isClosed = !elSelectCustom.classList.contains("isActive");

    if (isClosed) {
      openSelectCustom();
    } else {
      closeSelectCustom();
    }
  });

  const openSelectCustom = () => {
    elSelectCustom.classList.add("isActive");
    elSelectCustom.setAttribute("aria-hidden", false);

    if (optionChecked) {
      const optionCheckedIndex = customOptsList.findIndex(
        (el) => el.getAttribute("data-value") === optionChecked
      );
      updateCustomSelectHovered(optionCheckedIndex);
    }

    document.addEventListener("click", watchClickOutside);
    document.addEventListener("keydown", supportKeyboardNavigation);
  }

  const closeSelectCustom = () => {
    elSelectCustom.classList.remove("isActive");

    elSelectCustom.setAttribute("aria-hidden", true);

    updateCustomSelectHovered(-1);

    document.removeEventListener("click", watchClickOutside);
    document.removeEventListener("keydown", supportKeyboardNavigation);
  }

  const updateCustomSelectHovered = (newIndex) => {
    const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
    const option = elSelectCustomOpts.children[newIndex];

    if (prevOption) {
      prevOption.classList.remove("isHover");
    }
    if (option) {
      option.classList.add("isHover");
    }

    optionHoveredIndex = newIndex;
  }

  const updateCustomSelectChecked = (value, text) => {
    const prevValue = optionChecked;

    const elPrevOption = elSelectCustomOpts.querySelector(
      `[data-value="${prevValue}"`
    );
    const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

    if (elPrevOption) {
      elPrevOption.classList.remove("isActive");
    }

    if (elOption) {
      elOption.classList.add("isActive");
    }

    elSelectCustomBox.textContent = text;
    optionChecked = value;
  }

  const watchClickOutside = (e) => {
    const didClickedOutside = !elSelectCustom.contains(e.target);
    if (didClickedOutside) {
      closeSelectCustom();
    }
  }

  const supportKeyboardNavigation = (e) => {
    if (e.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
      let index = optionHoveredIndex;
      e.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex + 1);
    }

    if (e.keyCode === 38 && optionHoveredIndex > 0) {
      e.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex - 1);
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();

      const option = elSelectCustomOpts.children[optionHoveredIndex];
      const value = option && option.getAttribute("data-value");

      if (value) {
        elSelectNative.value = value;
        updateCustomSelectChecked(value, option.textContent);
      }
      closeSelectCustom();
    }

    if (e.keyCode === 27) {
      closeSelectCustom();
    }
  }

  elSelectNative.addEventListener("change", (e) => {
    const value = e.target.value;
    const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
      `[data-value="${value}"]`
    )[0];

    updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
  });

  customOptsList.forEach(function (elOption, index) {
    elOption.addEventListener("click", (e) => {
      const value = e.target.getAttribute("data-value");

      elSelectNative.value = value;
      updateCustomSelectChecked(value, e.target.textContent);
      closeSelectCustom();
    });

    elOption.addEventListener("mouseenter", (e) => {
      updateCustomSelectHovered(index);
    });

  });
}

const hybridSelectInit = () => {
  const allSelectsInPage = document.getElementsByClassName("js-hybrid-select");

  for (let i = 0; i < allSelectsInPage.length; i++) {
    hybridSoloInit(allSelectsInPage[i]);
  }
}

hybridSelectInit();
})
