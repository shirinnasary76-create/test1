const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

mobileToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  mobileToggle.textContent = isOpen ? '×' : '☰';
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    if (mobileToggle) mobileToggle.textContent = '☰';
  });
});

// نمایش تاریخ روز بر اساس تنظیمات مرورگر کاربر
const today = document.getElementById('today');
if (today) {
  today.textContent = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date());
}

// فرم در حالت نمایشی است؛ برای ارسال واقعی باید به سرویس یا بک‌اند متصل شود.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (formNote) {
    formNote.textContent = 'فرم از نظر مرورگر معتبر است، اما هنوز به سامانه ارسال پیام متصل نشده است.';
    formNote.style.color = '#b65b14';
  }
});


// منوی چهارگانه: در هر لحظه فقط یک دسته باز بماند.
const pathwayCards = document.querySelectorAll('.pathway-card');
pathwayCards.forEach(card => {
  card.addEventListener('toggle', () => {
    if (card.open) {
      pathwayCards.forEach(other => {
        if (other !== card) other.open = false;
      });
    }
  });
});

(function () {
  const searchSection = document.getElementById("service-search");
  const input = document.getElementById("serviceSearchInput");
  const button = document.getElementById("serviceSearchButton");
  const message = document.getElementById("serviceSearchMessage");

  if (!searchSection || !input || !button || !message) return;

  const tables = Array.from(document.querySelectorAll("table"));

  const table = tables.find(function (item) {
    return Boolean(
      searchSection.compareDocumentPosition(item) &
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  if (!table) {
    message.textContent =
      "جدولی بعد از بخش جست‌وجو پیدا نشد؛ جای جدول را بررسی کنید.";
    return;
  }

  const rows = Array.from(table.querySelectorAll("tbody tr"));

  function normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[يى]/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[۰-۹]/g, function (digit) {
        return "۰۱۲۳۴۵۶۷۸۹".indexOf(digit);
      })
      .replace(/[٠-٩]/g, function (digit) {
        return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);
      })
      .replace(/\s+/g, " ")
      .trim();
  }

  function searchServices() {
    const query = normalizeText(input.value);
    let visibleCount = 0;

    rows.forEach(function (row) {
      const rowText = normalizeText(row.innerText);
      const matches = !query || rowText.includes(query);

      row.hidden = !matches;

      if (matches) visibleCount++;
    });

    if (!query) {
      message.textContent = "";
    } else if (visibleCount > 0) {
      message.textContent =
        visibleCount + " مورد مطابق جست‌وجو پیدا شد.";
    } else {
      message.textContent =
        "موردی پیدا نشد؛ نام خدمت را بررسی کنید.";
    }
  }

  input.addEventListener("input", searchServices);
  button.addEventListener("click", searchServices);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchServices();
    }
  });
})();
