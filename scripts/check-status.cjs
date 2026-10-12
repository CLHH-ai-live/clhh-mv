const { _electron } = require("playwright"),
  fs = require("fs"),
  os = require("os"),
  path = require("path"),
  assert = require("assert/strict");
(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "clhh-state-"));
  const root = path.resolve("release");
  const video = path.resolve("renderer/assets/clhh-background-video.mp4");
  const app = await _electron.launch({
    executablePath: path.join(
      root,
      "mac-arm64/CLHH MV 创作.app/Contents/MacOS/CLHH MV 创作",
    ),
    args: [`--user-data-dir=${tmp}`],
  });
  try {
    const p = await app.firstWindow();
    await p.getByRole("button", { name: "9:16", exact: true }).click();
    await p.evaluate(
      ({ video }) => {
        const key = "rh-simple-tool-settings",
          j = JSON.parse(localStorage.getItem(key)),
          base = j.state.panels[0];
        j.state.panels = [
          { statusText: "待命", lastResults: [] },
          {
            statusText: "完成",
            lastResults: [{ path: video }],
            resultUnread: true,
          },
          { statusText: "失败：测试错误", lastResults: [] },
          {
            statusText: "完成",
            lastResults: [{ path: "/missing/output.mp4" }],
          },
          { statusText: "刷新后任务已中断，请重新生成", lastResults: [] },
        ].map((v, k) => ({
          ...base,
          ...v,
          id: "fixture-" + k,
          title: "工作台 " + (k + 1),
          audioBatchId: null,
          audioSegmentIndex: null,
        }));
        localStorage.setItem(key, JSON.stringify(j));
      },
      { video },
    );
    await p.reload();
    await p.locator(".clhh-generation-status").first().waitFor();
    assert.deepEqual(
      await p.locator(".clhh-generation-status").allTextContents(),
      ["待生成", "已完成", "失败", "文件缺失", "已中断"],
    );
    await p.getByRole("button", { name: "工作台 2", exact: true }).click();
    const badge = p
      .getByRole("button", { name: "工作台 2", exact: true })
      .locator(".clhh-generation-status");
    assert.equal(await badge.innerText(), "已完成");
    assert.equal(
      await badge.evaluate((e) => getComputedStyle(e).color),
      "rgb(187, 247, 208)",
    );
    await p.reload();
    await p.locator(".clhh-generation-status").first().waitFor();
    assert.equal(
      await p
        .getByRole("button", { name: "工作台 2", exact: true })
        .locator(".clhh-generation-status")
        .innerText(),
      "已完成",
    );
    await p.screenshot({ path: path.join(root, "status-preview.png") });
    await p.getByRole("button", { name: "设置", exact: true }).click();
    for (const ok of [false, true]) {
      await p.route("**/uc/openapi/accountStatus", (r) =>
        r.fulfill({
          contentType: "application/json",
          body: JSON.stringify({ code: ok ? 0 : 1 }),
        }),
      );
      await p.getByRole("button", { name: "测试连接", exact: true }).click();
      const status = p.getByRole("status");
      await status.filter({ hasText: ok ? "连接成功" : "连接失败" }).waitFor();
      assert.equal(
        await status.evaluate((e) => getComputedStyle(e).color),
        ok ? "rgb(134, 239, 172)" : "rgb(253, 164, 175)",
      );
      await p.unroute("**/uc/openapi/accountStatus");
    }
    console.log(
      "Verified statuses and completion after click/reload; connection success/failure colors.",
    );
  } finally {
    await app.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
