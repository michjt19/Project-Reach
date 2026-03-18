/**
 * Purpose: Multi-step volunteer form wizard.
 * Steps: About You → Your Story → Finish Up
 */
(function () {
  var form = document.getElementById('volunteerForm');
  if (!form) return;

  var steps = Array.from(form.querySelectorAll('.form-step'));
  var stepLabels = Array.from(document.querySelectorAll('.form-step-label'));
  var connectors = Array.from(document.querySelectorAll('.form-step-connector'));
  var currentStep = 0;
  var slideDirection = 'forward';

  function showStep(index, direction) {
    slideDirection = direction || 'forward';
    steps.forEach(function (s, i) {
      s.classList.remove('active', 'slide-left');
      s.removeAttribute('aria-current');
      if (i === index) {
        s.classList.add('active');
        s.setAttribute('aria-current', 'step');
        if (slideDirection === 'back') s.classList.add('slide-left');
      }
    });
    stepLabels.forEach(function (label, i) {
      label.classList.remove('active', 'done');
      if (i === index) label.classList.add('active');
      if (i < index) label.classList.add('done');
    });
    connectors.forEach(function (c, i) {
      c.classList.toggle('done', i < index);
    });
    currentStep = index;
  }

  function validateStep(index) {
    var step = steps[index];
    var fields = step.querySelectorAll('input[required], textarea[required], select[required]');
    var valid = true;
    fields.forEach(function (field) {
      if (!field.validity.valid) {
        field.reportValidity();
        valid = false;
      }
    });
    return valid;
  }

  form.querySelectorAll('[data-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (validateStep(currentStep)) {
        showStep(currentStep + 1, 'forward');
      }
    });
  });

  form.querySelectorAll('[data-back]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showStep(currentStep - 1, 'back');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    var submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';

    var data = new FormData(form);
    var endpoint = 'https://formspree.io/f/mnnvplrw';

    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    }).then(function (response) {
      if (response.ok) {
        showToast('\u2705 Thank you for signing up! We\u2019ll be in touch soon.', 'success');
        form.reset();
        showStep(0, 'back');
      } else {
        throw new Error('Submission failed');
      }
    }).catch(function () {
      showToast('\u26a0\ufe0f Something went wrong. Please try again later.', 'error');
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Application';
    });
  });

  showStep(0, 'forward');
})();
