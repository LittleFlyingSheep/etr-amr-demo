# ETR-AMR

Project demonstration for **Post-fusion Event-aware Time-Frequency Refinement for Audio Moment Retrieval**, accepted at **NCMMSC 2026**.

Audio Moment Retrieval (AMR, 音频时刻检索) localizes the start and end times of audio events described by a natural-language query.

## Demonstration

The page includes three original-speed 1080p audio-spectrogram videos, ground-truth and prediction timelines, IoU comparisons, the method framework, CASTELLA results, duration-wise analysis, and BibTeX.

The original cow example is excluded. Results shown are selected precomputed examples; the page does not perform online model inference.

## Hosting

This is a buildless static website. GitHub Pages serves the repository root on the `main` branch. All assets use relative paths and are included in this repository.

For local viewing, open `index.html`. A web server should support HTTP Range requests for reliable video seeking.

## Citation

See [citation.bib](assets/citation.bib).

GISP — Group of Intelligent Signal Processing, Harbin Engineering University.
