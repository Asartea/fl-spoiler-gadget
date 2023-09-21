mw.loader.using("oojs-ui-core").done(function () {
  function spoilerMessage(spoilerName: string, identifier: string) {
    $("#bodyContent").css("opacity", 0);
    OO.ui
      .confirm(
        "This page contains content related to " +
          spoilerName +
          ". Are you sure you want to view this?"
      )
      .done(function (confirmed) {
        if (confirmed) {
          $("#bodyContent").css("opacity", 100);
          setPermission(identifier);
        } else {
          history.back();
        }
      });
  }

  function checkForPermission(identifier: string) {
    return !mw.cookie.get(identifier) && !mw.user.options.get(identifier);
  }

  function setPermission(identifier: string) {
    if (mw.user.isAnon()) {
      mw.cookie.set(identifier, true);
    } else {
      mw.user.options.set(identifier, true);
    }
  }

  function checkForCategory(name: string) {
    return mw.config.get("wgCategories").includes(name);
  }

  if (mw.config.get("wgNamespaceNumber") === 0) {
    if (checkForCategory("Discordant Studies")) {
      if (checkForPermission("spoiler-discordance")) {
        spoilerMessage("Discordant Studies", "spoiler-discordance");
      }
    } else if (checkForCategory("SMEN Endings")) {
      if (checkForPermission("spoiler-smen")) {
        spoilerMessage(
          "the endings of Seeking Mr. Eaten's Name",
          "spoiler-smen"
        );
      }
    } else if (checkForCategory("Enigma")) {
      if (checkForPermission("spoiler-enigma")) {
        spoilerMessage("Ambition: Engima", "spoiler-enigma");
      }
    }
  }
});
