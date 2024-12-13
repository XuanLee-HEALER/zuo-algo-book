// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="overview.html">随便聊聊</a></li><li class="chapter-item expanded affix "><li class="part-title">课程内容</li><li class="chapter-item expanded "><a href="lesson_1.html"><strong aria-hidden="true">1.</strong> 二进制</a></li><li class="chapter-item expanded "><a href="lesson_2.html"><strong aria-hidden="true">2.</strong> 三种简单排序</a></li><li class="chapter-item expanded "><a href="lesson_3.html"><strong aria-hidden="true">3.</strong> 对数器</a></li><li class="chapter-item expanded "><a href="lesson_4.html"><strong aria-hidden="true">4.</strong> 二分搜索</a></li><li class="chapter-item expanded "><a href="lesson_5.html"><strong aria-hidden="true">5.</strong> 时间复杂度和空间复杂度</a></li><li class="chapter-item expanded "><a href="lesson_6.html"><strong aria-hidden="true">6.</strong> 算法和数据结构分类</a></li><li class="chapter-item expanded "><a href="lesson_7.html"><strong aria-hidden="true">7.</strong> 单双链表和堆栈</a></li><li class="chapter-item expanded "><a href="lesson_8.html"><strong aria-hidden="true">8.</strong> 二叉树及其三种序的遍历</a></li><li class="chapter-item expanded "><a href="lesson_9.html"><strong aria-hidden="true">9.</strong> 算法笔试中的输入输出处理</a></li><li class="chapter-item expanded "><a href="lesson_10.html"><strong aria-hidden="true">10.</strong> 递归和master公式</a></li><li class="chapter-item expanded "><a href="lesson_11.html"><strong aria-hidden="true">11.</strong> 归并排序</a></li><li class="chapter-item expanded "><a href="lesson_12.html"><strong aria-hidden="true">12.</strong> 归并分治</a></li><li class="chapter-item expanded "><a href="lesson_13.html"><strong aria-hidden="true">13.</strong> 随机快速排序</a></li><li class="chapter-item expanded "><a href="lesson_14.html"><strong aria-hidden="true">14.</strong> 随机选择算法</a></li><li class="chapter-item expanded "><a href="lesson_15.html"><strong aria-hidden="true">15.</strong> 堆结构和堆排序</a></li><li class="chapter-item expanded "><a href="lesson_16.html"><strong aria-hidden="true">16.</strong> 哈希表、有序表和比较器的用法</a></li><li class="chapter-item expanded "><a href="lesson_17.html"><strong aria-hidden="true">17.</strong> 基数排序</a></li><li class="chapter-item expanded "><a href="lesson_18.html"><strong aria-hidden="true">18.</strong> 排序总结</a></li><li class="chapter-item expanded "><a href="lesson_19.html"><strong aria-hidden="true">19.</strong> 异或运算的骚操作</a></li><li class="chapter-item expanded "><a href="lesson_20.html"><strong aria-hidden="true">20.</strong> 位运算的骚操作</a></li><li class="chapter-item expanded "><a href="lesson_21.html"><strong aria-hidden="true">21.</strong> 位图</a></li><li class="chapter-item expanded "><a href="lesson_22.html"><strong aria-hidden="true">22.</strong> 位运算实现加减乘除</a></li><li class="chapter-item expanded "><a href="lesson_23.html"><strong aria-hidden="true">23.</strong> 链表高频题和必备技巧</a></li><li class="chapter-item expanded "><a href="lesson_24.html"><strong aria-hidden="true">24.</strong> 数据结构设计高频题</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
